using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace E2F_Server2.Controllers
{
    public class ExportController : BaseController
    {
        [HttpGet("origin/{id:int}")]
        public async Task<IActionResult> ExportOriginalFile(int id)
        {
            try
            {
                var query = "select Name, FileName from Workbooks where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                var extension = Path.GetExtension(workbook.FileName);
                return PhysicalFile(Util.GetDataPath(workbook.FileName), Util.GetContentType(extension), $"{workbook.Name}{extension}");
            }
            catch
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Your request was not successful :("
                });
            }
        }

        [HttpGet("full/{id:int}")]
        public async Task<IActionResult> ExportFullData(int id)
        {
            try
            {
                var query = "select Id, Name, FileName from Workbooks where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                using (var excel = new ExcelPackage())
                {
                    var path = Util.GetDataPath(workbook.FileName);
                    await excel.LoadAsync(path);
                    await WorkbookHelper.UpdateExcelWithData(excel.Workbook.Worksheets, workbook);
                    var stream = new MemoryStream();
                    await excel.SaveAsAsync(stream);
                    stream.Position = 0;
                    var extension = Path.GetExtension(workbook.FileName);
                    return File(stream, Util.GetContentType(extension), $"{workbook.Name}{extension}");
                }
            }
            catch
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Your request was not successful :("
                });
            }
        }
    }
}
