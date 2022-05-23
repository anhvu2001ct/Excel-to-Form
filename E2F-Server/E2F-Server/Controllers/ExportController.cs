using Dapper;
using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server.Controllers
{
    public class ExportController : BaseController
    {
        [HttpGet("origin")]
        public async Task<IActionResult> ExportOriginalFile([FromQuery] string id)
        {
            try
            {
                var query = "select Name, SheetId, Extension from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                var path = Path.Combine(Program.RootPath, "Data", "sheet", workbook.SheetId);
                var extension = workbook.Extension ?? "";
                return PhysicalFile(path, Util.GetContentType(extension), $"{workbook.Name}{extension}");
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

        [HttpGet("full")]
        public async Task<IActionResult> ExportFullData([FromQuery] string id)
        {
            // Not doing.
            try
            {
                var query = "select Name, SheetId, Extension from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                var path = Path.Combine(Program.RootPath, "Data", "sheet", workbook.SheetId);
                return PhysicalFile(path, Util.GetContentType(workbook.Extension), workbook.Name);
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
