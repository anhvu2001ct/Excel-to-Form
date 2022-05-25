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
                var res = new List<WorkbookView>(li.Count);
                var tasks = new Task<WorkbookView>[li.Count];
                for (int i = 0; i < li.Count; ++i) tasks[i] = WorkbookHelper.GetWorkbookView(li[i]);
                return Ok(new
                {
                    status = true,
                    message = await Task.WhenAll(tasks)
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
        public async Task<IActionResult> GetWorkbook([FromQuery] string id)
        {
            try
            {
                var query = "Select * from Workbook where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                return Ok(new
                {
                    status = true,
                    message = await WorkbookHelper.GetWorkbookView(workbook)
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

        [HttpGet("search/name")]
        public async Task<IActionResult> SearchByName([FromQuery] string name)
        {
            // Todo: Remove accent
            try
            {
                var query = "Select * from Workbook where ";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { name });
                return Ok(new
                {
                    status = true,
                    message = await WorkbookHelper.GetWorkbookView(workbook)
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
