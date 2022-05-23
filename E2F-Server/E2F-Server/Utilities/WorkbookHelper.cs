using Dapper;
using E2F_Server.Model;
using OfficeOpenXml;

namespace E2F_Server.Utilities
{
    public static class WorkbookHelper
    {
        public static async Task<WorkbookPreImport?> GetWorkbookPreImport(IFormFile file)
        {
            var res = new WorkbookPreImport
            {
                WorkbookId = Guid.NewGuid().ToString(),
                Name = Path.GetFileNameWithoutExtension(file.FileName),
                Extension = Path.GetExtension(file.FileName)
            };

            string filePath = Path.Combine(Program.RootPath, "Data", "sheet", res.WorkbookId);
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
                        res.Sheets.Add(SheetHelper.GetSheet(sheet, i));
                    }
                }
            }
            catch
            {
                Util.DeleteData(Path.Combine("sheet", res.WorkbookId));
                return null;
            }

            if (res.Sheets.Count == 0) res = null;
            return res;
        }
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

        public static async Task UpdateWorkbookWithData(WorkbookStructure structure, ExcelWorksheets sheets)
        {
            foreach (var item in structure.Order)
            {
                var sheet = structure.Sheets[item];
                var reader = await Program.Sql.ExecuteReaderAsync($"select * from {item}");
                List<string[]> li = new();
                while (await reader.ReadAsync())
                {
                    string[] data = new string[sheet.Columns.Count];
                    for (int i = 0; i < data.Length; ++i) data[i] = reader.GetString(i+1);
                    li.Add(data);
                }
                SheetHelper.UpdateSheetWithData(sheets[sheet.Index], sheet.Cord, li);
            }
        }

    }
}
