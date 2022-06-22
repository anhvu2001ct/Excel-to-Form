using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Model.Helper;
using E2F_Server2.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace E2F_Server2.Controllers
{
    public class ExportController : BaseController
    {
        [HttpGet("origin/{workbookId:int}")]
        public async Task<IActionResult> ExportOriginalFile(int workbookId)
        {
            try
            {
                if (!await SqlHelper.RecordExists("Workbooks", workbookId)) return BadRequest(new
                {
                    success = false,
                    message = $"Workbook with id={workbookId} does not existed!"
                });

                var query = "select Name, FileName from Workbooks where Id=@workbookId";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { workbookId });
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

        [HttpGet("full/{workbookId:int}")]
        public async Task<IActionResult> ExportFullData(int workbookId)
        {
            try
            {
                if (!await SqlHelper.RecordExists("Workbooks", workbookId)) return BadRequest(new
                {
                    success = false,
                    message = $"Workbook with id={workbookId} does not existed!"
                });

                var query = "select Id, Name, FileName from Workbooks where Id=@workbookId";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { workbookId });
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

        [HttpPost("partial/{workbookId:int}")]
        public async Task<IActionResult> ExportPartial(int workbookId, Dictionary<int, SheetSearchQuery>? parts)
        {
            try
            {
                if (!await SqlHelper.RecordExists("Workbooks", workbookId)) return BadRequest(new
                {
                    success = false,
                    message = $"Workbook with id={workbookId} does not existed!"
                });

                var query = "select Id, Name, FileName from Workbooks where Id=@workbookId";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { workbookId });
                using (var excel = new ExcelPackage())
                {
                    var path = Util.GetDataPath(workbook.FileName);
                    await excel.LoadAsync(path);
                    await WorkbookHelper.UpdateExcelWithData(excel.Workbook.Worksheets, workbook, parts);
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
