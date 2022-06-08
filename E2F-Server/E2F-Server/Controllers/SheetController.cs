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
        public class  SheetQuery
        {
            public int WorkbookId { get; set; }
            public int SheetId { get; set; }
        }

        public class SheetSearch
        {
            public int WorkbookId { get; set; }
            public int SheetId { get; set; }
            public string? Pattern { get; set; }
            public string Column { get; set; } = null!;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetData([FromQuery] SheetQuery query)
        {
            try
            {
                var structure = await WorkbookHelper.GetStructure(query.WorkbookId);
                var tblName = structure.Order[query.SheetId];
                var reader = await Program.Sql.ExecuteReaderAsync($"select * from {tblName}");
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
            try
            {
                if (query.Column.Length > 20 || !query.Column.All(char.IsLetterOrDigit)) throw new Exception();

                query.Pattern ??= "";
                var structure = await WorkbookHelper.GetStructure(query.WorkbookId);
                var tblName = structure.Order[query.SheetId];
                var reader = await Program.Sql.ExecuteReaderAsync(@$"select * from {tblName}
                                                                    where dbo.rmvAccent({query.Column}) like concat(N'%',dbo.rmvAccent(@Pattern),'%')",
                                                                    new { query.Pattern });
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

        [HttpPost("add/{workbookId:int}/{sheetId:int}")]
        public async Task<IActionResult> AddData(int workbookId, int sheetId, IFormCollection form)
        {
            try
            {
                if (form.Count < 1) return BadRequest(new
                {
                    success = false,
                    message = "At least one field must not empty"
                });

                var structure = await WorkbookHelper.GetStructure(workbookId);
                var tblName = structure.Order[sheetId];
                var parameters = new DynamicParameters();
                foreach (var item in form) parameters.Add(item.Key, item.Value.First());
                var query = SqlHelper.GetInsertQuery(tblName, parameters.ParameterNames.ToArray());
                await Program.Sql.ExecuteAsync(query, parameters);

                var sheet = structure.Sheets[tblName];
                return Ok(new
                {
                    success = true,
                    message = $"Imported new data to sheet={sheet.Name} in workbookId={workbookId}"
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

        [HttpDelete("delete/{workbookId:int}/{sheetId:int}/{rowId:int}")]
        public async Task<IActionResult> DeleteRowById(int workbookId, int sheetId,int rowId)
        {
            try
            {
                var structure = await WorkbookHelper.GetStructure(workbookId);
                var tblName = structure.Order[sheetId];
                await Program.Sql.ExecuteAsync($"delete from {tblName} where Id=@rowId", new { rowId });

                return Ok(new
                {
                    status = true,
                    message = $"Deleted row by id={rowId}"
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

        [HttpPost("edit/{workbookId:int}/{sheetId:int}/{rowId:int}")]
        public async Task<IActionResult> EditRowById(int workbookId, int sheetId, int rowId, IFormCollection form)
        {
            try
            {
                if (form.Count < 1) return BadRequest(new
                {
                    success = false,
                    message = "At least one field must not empty"
                });

                var structure = await WorkbookHelper.GetStructure(workbookId);
                var tblName = structure.Order[sheetId];
                var parameters = new DynamicParameters();
                foreach (var item in form) parameters.Add(item.Key, item.Value.First());
                var query = SqlHelper.GetUpdateQuery(tblName, "Id", parameters.ParameterNames.ToArray());
                parameters.Add("Id", rowId);
                await Program.Sql.ExecuteAsync(query, parameters);

                var sheet = structure.Sheets[tblName];
                return Ok(new
                {
                    success = true,
                    message = $"Edited rowId={rowId} of sheet={sheet.Name} in workbookId={workbookId}"
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
