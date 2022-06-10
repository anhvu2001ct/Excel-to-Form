using E2F_Server.Model;
using OfficeOpenXml;
using System.Data.Common;

namespace E2F_Server.Utilities
{
    public static class SheetHelper
    {
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

        public static SheetPreImport ValidateSheetCord(ExcelWorksheet sheet, int rowIndex, string startCol, string endCol)
        {
            var res = new SheetPreImport
            {
                Cord = new SheetCord
                {
                    RowIndex = rowIndex
                }
            };
            if (sheet.Dimension.End.Row >= rowIndex) UpdateSheet(sheet, res, startCol, endCol);
            if (!res.Valid)
            {
                res.Cord.ColumnStart = startCol;
                res.Cord.ColumnEnd = endCol;
            }
            return res;
        }

        public static void UpdateSheet(ExcelWorksheet sheet, SheetPreImport data, string startCol, string endCol)
        {
            var cells = sheet.Cells[$"{startCol}{data.Cord.RowIndex}:{endCol}{data.Cord.RowIndex}"];
            string? lastCell = null;

            int start = ColumnNameToNumber(startCol), end = ColumnNameToNumber(endCol);
            for (int i = start; i <= end; ++i)
            {
                var cell = sheet.Cells[data.Cord.RowIndex, i];
                var fieldName = cell?.Text;
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

            if (lastCell != null)
            {
                data.Cord.ColumnEnd = GetColumnFromAddress(lastCell);
                data.Valid = true;
            }
        }

        public static void UpdateSheetWithData(ExcelWorksheet sheet, SheetCord cord, List<SheetRow> data)
        {
            int firstRow = cord.RowIndex + 1;
            var range = sheet.Cells[$"{cord.ColumnStart}{firstRow}:{cord.ColumnEnd}{firstRow}"];
            sheet.InsertRow(firstRow + 1, data.Count - 1);
            for (int i = 1; i < data.Count; i++)
                range.Copy(sheet.Cells[$"{cord.ColumnStart}{firstRow + i}"]);
            var rowData = data.Select(row => row.Data);
            range.LoadFromArrays(rowData);
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

        public static async Task<List<SheetRow>> ReadData(DbDataReader reader)
        {
            int colCount = reader.FieldCount - 1;
            List<SheetRow> res = new();
            while (await reader.ReadAsync())
            {
                SheetRow row = new SheetRow
                {
                    Id = reader.GetInt32(0),
                    Data = new string[colCount]
                };

                for (int i = 0; i < colCount; ++i)
                {
                    row.Data[i] = reader.IsDBNull(i+1) ? "" : reader.GetString(i+1);
                }
                res.Add(row);
            }
            return res;
        }

        public static int ColumnNameToNumber(string columnName)
        {
            int sum = 0;
            for (int i = 0; i < columnName.Length; i++)
            {
                sum *= 26;
                sum += (columnName[i] - 'A' + 1);
            }

            return sum;
        }
    }
}
