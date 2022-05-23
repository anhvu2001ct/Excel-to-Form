using E2F_Server.Model;
using OfficeOpenXml;

namespace E2F_Server.Utilities
{
    public static class SheetHelper
    {
        public static async Task<WorkbookView> GetWorkbookView(Workbook workbook)
        {
            var res = new WorkbookView
            {
                Id = workbook.Id,
                Name = workbook.Name,
                Description = workbook.Description
            };

            var structure = await Util.ReadData<WorkbookStructure>(Path.Combine("structure", $"{res.Id}.json"));
            foreach (var item in structure!.Order)
            {
                var sheet = structure.Sheets[item];
                res.Sheets.Add(new WorkbookView.SimpleSheet
                {
                    Name = sheet.Name,
                    Columns = sheet.Columns
                });
            }

            return res;
        }

        public static async Task<WorkbookPreImport?> GetWorkbook(IFormFile file)
        {
            var res = new WorkbookPreImport
            {
                SheetId = Guid.NewGuid().ToString(),
                Name = Path.GetFileNameWithoutExtension(file.FileName),
                Extension = Path.GetExtension(file.FileName)
            };

            string filePath = Path.Combine(Program.RootPath, "Data", "sheet", res.SheetId);
            using var orgStream = file.OpenReadStream();

            using (var fileStream = File.Create(filePath))
            {
                await orgStream.CopyToAsync(fileStream);
            }

            try
            {
                using (var excel = new ExcelPackage())
                {
                    await excel.LoadAsync(filePath);
                    var sheets = excel.Workbook.Worksheets;
                    int num = sheets.Count;

                    for (int i = 0; i < num; ++i)
                    {
                        var sheet = sheets[i];
                        if (sheet.Hidden != eWorkSheetHidden.Visible) continue;
                        res.Sheets.Add(GetSheet(sheet, i));
                    }
                }
            }
            catch
            {
                Util.DeleteData(Path.Combine("sheet", res.SheetId));
                return null;
            }

            if (res.Sheets.Count == 0) res = null;
            return res;
        }

        public static SheetPreImport GetSheet(ExcelWorksheet sheet, int idx)
        {
            var res = new SheetPreImport
            {
                SheetIndex = idx,  
                Name = sheet.Name
            };

            if (sheet.Dimension != null)
            {
                res.Cord.RowIndex = sheet.Dimension.Start.Row;
                string startCol = ExcelCellAddress.GetColumnLetter(sheet.Dimension.Start.Column);
                string endCol = ExcelCellAddress.GetColumnLetter(sheet.Dimension.End.Column);
                UpdateSheet(sheet, res, startCol, endCol);
            }

            return res;
        }

        public static SheetCord ValidateSheet(ExcelWorksheet sheet, int rowIndex, string startCol, string endCol)
        {
            var res = new SheetPreImport
            {
                Cord = new SheetCord
                {
                    RowIndex = rowIndex
                }
            };
            UpdateSheet(sheet, res, startCol, endCol);
            return res.Cord;
        }

        public static void UpdateSheet(ExcelWorksheet sheet, SheetPreImport data, string startCol, string endCol)
        {
            var cells = sheet.Cells[$"{startCol}{data.Cord.RowIndex}:{endCol}{data.Cord.RowIndex}"];
            string? lastCell = null;

            foreach (var cell in cells)
            {
                var fieldName = cell.Text;
                if (data.Cord.ColumnStart == null && !string.IsNullOrEmpty(fieldName))
                {
                    data.Cord.ColumnStart = GetColumnFromAddress(cell.Address);
                }

                if (data.Cord.ColumnStart != null)
                {
                    if (string.IsNullOrEmpty(fieldName)) break;
                    data.Fields.Add(fieldName);
                    lastCell = cell.Address;
                }
            }

            if (lastCell != null) data.Cord.ColumnEnd = GetColumnFromAddress(lastCell);
        }

        public static string GetColumnFromAddress(string address)
        {
            for (int i = 0; i < address.Length; i++)
            {
                if (char.IsDigit(address[i]))
                    return address.Substring(0, i);
            }
            return null!;
        }

        public static Sheet GetStructure(ExcelWorksheets sheets, int sheetIdx, SheetPreImport data)
        {
            var sheet = sheets[sheetIdx];

            var res = new Sheet
            {
                Index = sheetIdx,
                Name = data.Name,
                Cord = data.Cord
            };

            res.Columns.Capacity = data.Fields.Count;

            int counter = -1;
            foreach (var fieldName in data.Fields) res.Columns.Add(new()
            {
                Id = $"c{++counter:D2}",
                Name = fieldName
            });
            
            var cells = sheet.Cells[$"{data.Cord.ColumnStart}{data.Cord.RowIndex +1}:{data.Cord.ColumnEnd}{data.Cord.RowIndex +1}"];
            counter = -1;
            foreach (var cell in cells)
            {
                ++counter;
                var validation = sheet.DataValidations[cell.Address];
                if (validation == null) continue;

                var fomula = validation.As.ListValidation.Formula.ExcelFormula;
                var column = res.Columns[counter];
                column.Type = "select";
                column.Additional = GetDataFromFomula(sheets, fomula);
            }

            cells = sheet.Cells[$"{data.Cord.ColumnStart}{data.Cord.RowIndex}:{data.Cord.ColumnEnd}{data.Cord.RowIndex}"];
            counter = -1;
            foreach (var cell in cells)
            {
                var column = res.Columns[++counter];
                if (column.Type != null) continue;
                string name = cell.GetCellValue<string>();
                column.Type = GetDataTypeFromName(name);
            }

            return res;
        }

        public static List<string> GetDataFromFomula(ExcelWorksheets sheets, string fomula)
        {
            var tokens = fomula.Split('!');
            var cells = sheets[tokens[0]].Cells[tokens[1]];
            List<string> res = new();
            foreach (var cell in cells) res.Add(cell.Text);
            return res;
        }

        public static string GetDataTypeFromName(string name)
        {
            name = name.Trim().ToLower();
            if (name.EndsWith("email")) return "email";
            if (name.EndsWith("phone")) return "phone";
            if (name.EndsWith("date")) return "date";
            if (name.EndsWith("note")) return "area";
            return "text";
        }
    }
}
