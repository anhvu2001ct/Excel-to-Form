using Dapper;
using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Text.Json;

namespace E2F_Server.Controllers
{
    public class WorkbookController : BaseController
    {
        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllWorkbook()
        {
            try
            {
                var query = "Select * from Workbook";
                var li = (await Program.Sql.QueryAsync<Workbook>(query)).ToList();
                var res = new List<WorkbookView>();
                foreach (var item in li) res.Add(await SheetHelper.GetWorkbookView(item));
                return Ok(new
                {
                    status = true,
                    message = res
                });
            }
            catch
            {
                return StatusCode(500, new
                {
                    status = false,
                    message = "Your request was not successful :("
                });
            }
        }

        [HttpGet("get/single")]
        public async Task<IActionResult> GetAllWorkbook([FromQuery] string id)
        {
            try
            {
                var query = "Select * from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.GetWorkbookView(workbook)
                });
            }
            catch
            {
                return StatusCode(500, new
                {
                    status = false,
                    message = "Your request was not successful :("
                });
            }
        }
    }
}
