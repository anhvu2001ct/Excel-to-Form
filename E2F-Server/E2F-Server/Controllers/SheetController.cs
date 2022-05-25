using Dapper;
using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Text.Json;

namespace E2F_Server.Controllers
{
    public class SheetController : BaseController
    {
        public struct SheetQuery
        {
            public int WorkbookId { get; set; }
            public int SheetIndex { get; set; }
        }

        public struct SheetSearch
        {
            public int WorkbookId { get; set; }
            public int SheetIndex { get; set; }
            public string? Pattern { get; set; }
            public string Column { get; set; } = null!;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetData([FromQuery] SheetQuery query)
        {
            try
            {
                var structure = await WorkbookHelper.GetStructure(query.WorkbookId);
                var sheetTblName = structure.Order[query.SheetIndex];
                var reader = await Program.Sql.ExecuteReaderAsync($"select * from {sheetTblName}");
                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.ReadData(reader)
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

        [HttpGet("search")]
        public async Task<IActionResult> SearchData([FromQuery] SheetSearch query)
        {
            // Todo: remove accent
            try
            {
                var structure = await WorkbookHelper.GetStructure(query.WorkbookId);
                var sheetTblName = structure.Order[query.SheetIndex];
                var reader = await Program.Sql.ExecuteReaderAsync($"select * from {sheetTblName}");
                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.ReadData(reader)
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

        [HttpPost("add")]
        public async Task<IActionResult> AddData(IFormCollection form)
        {
            //Not done.
            return NotFound();
        }
    }
}
