using E2F_Server.Model;
using OfficeOpenXml;

namespace E2F_Server.Utilities
{
    public static class SheetHelper
    {
        public static async Task<Workbook> GetWorkbook(IFormFile file)
        {
            var res = new Workbook
            {
                Id = $"{DateTime.Now.Ticks}-{Guid.NewGuid()}",
                Name = file.FileName
            };

            string filePath = Path.Combine(Program.RootPath, "Data", res.Id);
            using var orgStream = file.OpenReadStream();

            using (var fileStream = File.Create(filePath))
            {
                await orgStream.CopyToAsync(fileStream);
            }

            using (var excel = new ExcelPackage())
            {
                await excel.LoadAsync(filePath);
                var sheets = excel.Workbook.Worksheets;

                foreach (var sheet in sheets)
                {
                    if (sheet.Hidden != eWorkSheetHidden.Visible) continue;
                    res.Sheets.Add(GetSheet(sheet, 2));
                }
            }

            return res;
        }

        public static Sheet ValidateSheet(ExcelWorksheet sheet, int rowIndex, string startCol, string endCol)
        {
            var res = new Sheet
            {
                Name = sheet.Name,
                RowIndex = rowIndex
            };
            UpdateSheet(sheet, res, startCol, endCol);
            return res;
        }

        public static Sheet GetSheet(ExcelWorksheet sheet, int rowIndex)
        {
            var res = new Sheet
            {
                Name = sheet.Name,
                RowIndex = rowIndex
            };

            if (sheet.Dimension != null)
            {
                string startCol = ExcelCellAddress.GetColumnLetter(sheet.Dimension.Start.Column);
                string endCol = ExcelCellAddress.GetColumnLetter(sheet.Dimension.End.Column);
                UpdateSheet(sheet, res, startCol, endCol);
            }

            return res;
        }

        public static void UpdateSheet(ExcelWorksheet sheet, Sheet data, string startCol, string endCol)
        {
            var cells = sheet.Cells[$"{startCol}{data.RowIndex}:{endCol}{data.RowIndex}"];
            string? lastCell = null;

            foreach (var cell in cells)
            {
                var fieldName = cell.Text;
                if (data.ColumnStart == null && !string.IsNullOrEmpty(fieldName))
                {
                    data.ColumnStart = GetColumnFromAddress(cell.Address);
                }

                if (data.ColumnStart != null)
                {
                    if (string.IsNullOrEmpty(fieldName)) break;
                    data.Fields.Add(fieldName);
                    lastCell = cell.Address;
                }
            }

            if (lastCell != null) data.ColumnEnd = GetColumnFromAddress(lastCell);
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
    }
}
