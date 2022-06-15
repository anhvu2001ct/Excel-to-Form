using Dapper;
using E2F_Server2.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server2.Controllers
{
    public class SheetController : BaseController
    {
        [HttpGet("get/data")]
        public async Task<IActionResult> GetData([FromQuery] int sheetId)
        {
            try
            {
                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.GetSheetData(sheetId)
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

        [HttpPost("add/{sheetId:int}")]
        public async Task<IActionResult> AddData(int sheetId, IFormCollection form)
        {
            try
            {
                if (form.Count < 1) return BadRequest(new
                {
                    success = false,
                    message = "At least one field must not empty"
                });

                var query = SqlHelper.GetInsertIdQuery("SheetRows", "Id", "SheetId");
                var rowId = await Program.Sql.ExecuteScalarAsync<int>(query, new { SheetId=sheetId });

                query = SqlHelper.GetInsertQuery("SheetFields", "Value", "RowId", "ColumnId");
                await Program.Sql.ExecuteAsync(query, form.Select(c => new
                {
                    Value = c.Value.First(),
                    RowId = rowId,
                    ColumnId = c.Key
                }));

                return Ok(new
                {
                    success = true,
                    message = $"Imported new data to sheetId={sheetId}"
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

        [HttpDelete("delete/row/{rowId:int}")]
        public async Task<IActionResult> DeleteRowById(int rowId)
        {
            try
            {
                var query = "delete from SheetRows where Id=@rowId";
                await Program.Sql.ExecuteAsync(query, new { rowId });

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

        [HttpPut("edit/data")]
        public async Task<IActionResult> EditData(IFormCollection form)
        {
            try
            {
                if (form.Count < 1) return BadRequest(new
                {
                    success = false,
                    message = "At least one field must not empty"
                });

                var query = SqlHelper.GetUpdateQuery("SheetFields", "Id", "Value");
                await Program.Sql.ExecuteAsync(query, form.Select(field => new
                {
                    Id = field.Key,
                    Value = field.Value.First()
                }));

                return Ok(new
                {
                    success = true,
                    message = $"Updated new data"
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
