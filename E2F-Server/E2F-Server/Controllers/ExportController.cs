using Dapper;
using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace E2F_Server.Controllers
{
    public class ExportController : BaseController
    {
        [HttpGet("origin/{id:int}")]
        public async Task<IActionResult> ExportOriginalFile(int id)
        {
            try
            {
                var query = "select Name, WorkbookId, Extension from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                var path = Path.Combine(Program.RootPath, "Data", "sheet", workbook.WorkbookId);
                var extension = workbook.Extension ?? "";
                return PhysicalFile(path, Util.GetContentType(workbook.Extension), $"{workbook.Name}{extension}");
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
                var query = "select Id, Name, WorkbookId, Extension from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                var structure = await WorkbookHelper.GetStructure(workbook.Id);
                using (var excel = new ExcelPackage())
                {
                    var path = Path.Combine(Program.RootPath, "Data", "sheet", workbook.WorkbookId);
                    await excel.LoadAsync(path);
                    await WorkbookHelper.UpdateWorkbookWithData(structure, excel.Workbook.Worksheets);
                    var stream = new MemoryStream();
                    await excel.SaveAsAsync(stream);
                    stream.Position = 0;
                    var extension = workbook.Extension ?? "";
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
