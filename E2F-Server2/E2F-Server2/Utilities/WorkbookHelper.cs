using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Model.Helper;
using OfficeOpenXml;

namespace E2F_Server2.Utilities
{
    public static class WorkbookHelper
    {
        public static async Task<WorkbookImport?> GetWorkbookImport(IFormFile file)
        {
            var res = new WorkbookImport
            {
                Workbook = new Workbook
                {
                    Id = -1,
                    FileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}",
                    Name = Path.GetFileNameWithoutExtension(file.FileName),
                }
            };

            var filePath = Util.GetDataPath(res.Workbook.FileName);
            using (var fileStream = File.Create(filePath))
            {
                using var orgStream = file.OpenReadStream();
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
                        res.Sheets.Add(SheetHelper.GetSheetImport(sheet, i));
                    }
                }
            }
            catch
            {
                Util.DeleteData(res.Workbook.FileName);
                return null;
            }

            if (res.Sheets.Count == 0) res = null;
            return res;
        }

        public static async Task UpdateExcelWithData(ExcelWorksheets sheets, Workbook workbook, Dictionary<int, List<KeyValuePair<int, string>>>? parts = null)
        {
            var query = "select * from Sheets where WorkbookId=@Id";
            var li = await Program.Sql.QueryAsync<Sheet>(query, new { workbook.Id });
            foreach (var sheet in li)
            {
                int id = sheet.Id;
                if (parts != null && !parts.ContainsKey(id)) continue;
                var data = parts == null ? await SheetHelper.GetFullSheetData(id) : await SheetHelper.GetSheetData(id, parts[id]);
                SheetHelper.UpdateExcelWithData(sheets[sheet.SheetIndex], sheet, data);
            }
        }

        public static async Task<WorkbookSheets> GetWorkbookSheets(int workbookId)
        {
            var query = "select * from Workbooks where Id=@workbookId";
            var res = new WorkbookSheets
            {
                Workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { workbookId })
            };
            query = "select Id from Sheets where WorkbookId=@workbookId";
            var li = await Program.Sql.QueryAsync<int>(query, new { workbookId });
            res.Sheets = await Task.WhenAll(li.Select(sheetId => SheetHelper.GetSheet(sheetId)));
            return res;
        }
    }
}
