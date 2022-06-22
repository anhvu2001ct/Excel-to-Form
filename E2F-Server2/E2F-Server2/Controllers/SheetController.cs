using Dapper;
using E2F_Server2.Model.Helper;
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
                if (!await SqlHelper.RecordExists("Sheets", sheetId)) return BadRequest(new
                {
                    success = false,
                    message = $"Sheet with id={sheetId} does not existed!"
                });

                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.GetFullSheetData(sheetId)
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
                    message = "At least one input must be specified"
                });

                var query = "select Id from SheetColumns where SheetId=@sheetId";
                var columnIds = (await Program.Sql.QueryAsync<string>(query, new { sheetId })).AsList();

                if (columnIds.Count == 0) return BadRequest(new
                {
                    success = false,
                    message = $"Sheet with id={sheetId} does not existed!"
                });

                query = SqlHelper.GetInsertIdQuery("SheetRows", "Id", "SheetId");
                var rowId = await Program.Sql.ExecuteScalarAsync<int>(query, new { SheetId = sheetId });

                query = SqlHelper.GetInsertQuery("SheetFields", "Value", "RowId", "ColumnId");
                await Program.Sql.ExecuteAsync(query, columnIds.Select(cId => new
                {
                    Value = form.ContainsKey(cId) ? form[cId].First() : null,
                    RowId = rowId,
                    ColumnId = cId
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

        [HttpPost("search/{sheetId:int}")]
        public async Task<IActionResult> SearchData(int sheetId, SheetSearchQuery query)
        {
            try
            {
                if (!await SqlHelper.RecordExists("Sheets", sheetId)) return BadRequest(new
                {
                    success = false,
                    message = $"Sheet with id={sheetId} does not existed!"
                });

                return Ok(new
                {
                    status = true,
                    message = await SheetHelper.GetSheetData(sheetId, query)
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
                var result = await Program.Sql.ExecuteAsync(query, new { rowId });

                if (result == 0) return BadRequest(new
                {
                    status = false,
                    message = $"Row with id={rowId} does not existed!"
                });

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
                    message = "At least one input must be specified"
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
