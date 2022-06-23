using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Model.Helper;
using OfficeOpenXml;

namespace E2F_Server2.Utilities
{
    public static class SheetHelper
    {
        public static SheetImport GetSheetImport(ExcelWorksheet sheet, int idx)
        {
            var res = new SheetImport
            {
                Sheet = new Sheet
                {
                    Id = -1,
                    SheetIndex = idx,
                    Name = sheet.Name
                }
            };

            if (sheet.Dimension != null)
            {
                var dim = sheet.Dimension;
                res.Sheet.HeaderStartRow = dim.Start.Row;
                res.Sheet.HeaderEndRow = res.Sheet.HeaderStartRow;
                UpdateSheetImport(sheet, res, dim.Start.Column, dim.End.Column);
            }

            return res;
        }

        public static SheetImport ValidateSheetImport(ExcelWorksheet sheet, int rowIndex, string startCol, string endCol)
        {
            var res = new SheetImport
            {
                Sheet = new Sheet
                {
                    HeaderStartRow = rowIndex,
                    HeaderEndRow = rowIndex
                }
            };

            if (sheet.Dimension != null && sheet.Dimension.End.Row >= rowIndex)
                UpdateSheetImport(sheet, res, ColumnNameToNumber(startCol), ColumnNameToNumber(endCol));

            if (!res.Valid)
            {
                res.Sheet.HeaderStartCol = startCol;
                res.Sheet.HeaderEndCol = endCol;
            }
            return res;
        }

        public static void UpdateSheetImport(ExcelWorksheet sheet, SheetImport data, int startCol, int endCol)
        {
            var cells = sheet.Cells[data.Sheet.HeaderStartRow, startCol, data.Sheet.HeaderEndRow, endCol];
            string? lastCell = null;

            int firstCol = startCol;
            for (int i = startCol; i <= endCol; ++i)
            {
                var cell = sheet.Cells[data.Sheet.HeaderStartRow, i];
                var fieldName = cell?.Text;
                if (data.Sheet.HeaderStartCol == null && !string.IsNullOrEmpty(fieldName))
                {
                    data.Sheet.HeaderStartCol = GetColumnFromAddress(cell!.Address);
                    firstCol = i;
                }

                if (data.Sheet.HeaderStartCol != null)
                {
                    if (string.IsNullOrEmpty(fieldName)) break;
                    data.Sheet.Columns.Add(new SheetColumn
                    {
                        Id = -1,
                        Name = fieldName,
                        ColumnIndex = i - firstCol
                    });
                    lastCell = cell!.Address;
                }
            }

            if (lastCell != null)
            {
                data.Sheet.HeaderEndCol = GetColumnFromAddress(lastCell);
                data.Valid = true;
            }
        }

        public static async Task InsertSheetColumns(ExcelWorksheets sheets, ExcelWorksheet sheet, Sheet data)
        {
            var cells = sheet.Cells[$"{data.HeaderStartCol}{data.HeaderStartRow + 1}:{data.HeaderEndCol}{data.HeaderStartRow + 1}"];
            int counter = -1;
            Dictionary<int, List<string>> selectData = new();
            foreach (var cell in cells)
            {
                ++counter;
                var validation = sheet.DataValidations[cell.Address];
                if (validation == null) continue;

                var column = data.Columns[counter];
                column.ColumnType = "select";
                column.IsRequired = true;
                selectData[counter] = GetDataFromFomula(sheets, validation.As.ListValidation.Formula.ExcelFormula);
            }

            cells = sheet.Cells[$"{data.HeaderStartCol}{data.HeaderStartRow}:{data.HeaderEndCol}{data.HeaderStartRow}"];
            counter = -1;
            var queryColumn = SqlHelper.GetInsertIdQuery("SheetColumns", "Id", "Name", "ColumnType", "IsRequired", "ColumnIndex", "SheetId");
            var queryOption = SqlHelper.GetInsertQuery("SelectOptions", "Value", "ColumnId");
            foreach (var cell in cells)
            {
                var column = data.Columns[++counter];
                if (column.ColumnType == null)
                {
                    string name = cell.GetCellValue<string>();
                    column.ColumnType = GetDataTypeFromName(name);
                }
                column.Id = await Program.Sql.ExecuteScalarAsync<int>(queryColumn, new
                {
                    column.Name,
                    column.ColumnType,
                    column.IsRequired,
                    column.ColumnIndex,
                    SheetId = data.Id
                });
                if (column.ColumnType == "select") await Program.Sql.ExecuteAsync(queryOption, selectData[counter].Select(o => new
                {
                    Value = o,
                    ColumnId = column.Id
                }));
            }
        }

        public static void UpdateExcelWithData(ExcelWorksheet excelSheet, Sheet sheet, List<SheetRow> data)
        {
            var firstDataRow = sheet.HeaderStartRow + 1;
            var range = excelSheet.Cells[$"{sheet.HeaderStartCol}{firstDataRow}:{sheet.HeaderEndCol}{firstDataRow}"];

            excelSheet.InsertRow(firstDataRow + 1, data.Count - 1);
            for (int i = 1; i < data.Count; i++)
                range.Copy(excelSheet.Cells[$"{sheet.HeaderStartCol}{firstDataRow + i}"]);
            range.LoadFromArrays(SheetDataToArray(data));
        }

        public static async Task<Sheet> GetSheet(int sheetId)
        {
            Sheet res = await Program.Sql.QuerySingleAsync<Sheet>("select * from Sheets where Id=@sheetId", new { sheetId });
            var query = "select * from SheetColumns where SheetId=@Id";
            res.Columns = (await Program.Sql.QueryAsync<SheetColumn>(query, new { res.Id })).AsList();
            foreach (var column in res.Columns)
            {
                if (column.ColumnType == "select")
                {
                    query = "select Value from SelectOptions where ColumnId=@Id";
                    column.SelectOptions = (await Program.Sql.QueryAsync<string>(query, new { column.Id })).AsList();
                }
            }
            return res;
        }

        public static async Task<List<SheetRow>> GetFullSheetData(int sheetId)
        {
            var query = @"select f.Id, f.Value, f.RowId, r.CreatedAt
                            from SheetRows r
                            left join SheetFields f on f.RowId=r.Id
                            left join SheetColumns c on c.Id=f.ColumnId
                            where r.SheetId=@sheetId
                            order by f.RowId, c.ColumnIndex";
            var li = await Program.Sql.QueryAsync<SheetFieldSelected>(query, new { sheetId });
            return GetListRows(li);
        }

        public static async Task<List<SheetRow>> GetSheetData(int sheetId, SheetSearchQuery searchQuery)
        {
            List<KeyValuePair<string, string>> dataToCases = new();
            var parameters = new DynamicParameters();
            int cnt = -1;
            foreach (var pattern in searchQuery.SearchPatterns)
            {
                if (pattern.Value == null) continue;
                var cid = $"cid{++cnt}";
                var cval = $"c{cnt}";
                dataToCases.Add(new(cid, cval));
                parameters.Add(cid, pattern.Key);
                parameters.Add(cval, pattern.Value);
            }

            var sortQuery = searchQuery.Sorting == null ?
                            @"select
		                        Id,
		                        ROW_NUMBER() over(order by Id) as rn
                                from valid_rows" :
                            $@"select
                                r.Id,
		                        ROW_NUMBER() over(order by f.Value {searchQuery.Sorting.Order}) as rn
                                from valid_rows r
                                left join SheetFields f on f.RowId=r.Id
                                where f.ColumnId=@sortColumnId";

            if (searchQuery.Sorting != null) parameters.Add("sortColumnId", searchQuery.Sorting.ColumnId);

            var query = @$"with fields as (
	                        select
		                        RowId,
		                        {SqlHelper.GetCasesFromPatterns(dataToCases)}
	                        from
		                        SheetColumns c
		                        left join SheetFields f on f.ColumnId = c.Id
	                        where
		                        c.SheetId=@sheetId
                        ), valid_rows as (
	                        select RowId as Id
	                        from fields
	                        group by RowId
	                        having min(Matched)=1
                        ), sorted as (
                           {sortQuery}
                        )
                        select f.Id, f.Value, f.RowId, r.CreatedAt
                        from sorted s
	                        left join SheetRows r on r.Id=s.Id
	                        left join SheetFields f on f.RowId=r.Id
	                        left join SheetColumns c on c.Id=f.ColumnId
                        order by s.rn, c.ColumnIndex";
            parameters.Add("sheetId", sheetId);
            var li = await Program.Sql.QueryAsync<SheetFieldSelected>(query, parameters);
            return GetListRows(li);
        }

        private static List<SheetRow> GetListRows(IEnumerable<SheetFieldSelected> li)
        {
            var res = new List<SheetRow>();
            foreach (var field in li)
            {
                if (res.Count == 0 || res.Last().Id != field.RowId) res.Add(new SheetRow
                {
                    Id = field.RowId,
                    CreatedAt = field.CreatedAt,
                });
                var row = res.Last();
                row.Fields.Add(new SheetField
                {
                    Id = field.Id,
                    Value = field.Value
                });
            }
            return res;
        }

        public static IEnumerable<string[]> SheetDataToArray(List<SheetRow> sheetData)
        {
            return sheetData.Select(row => row.Fields.Select(field => field.Value ?? "").ToArray());
        }

        public static string GetColumnFromAddress(string address)
        {
            for (int i = 0; i < address.Length; i++)
            {
                if (char.IsDigit(address[i])) return address[..i];
            }
            return null!;
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
