using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server2.Controllers
{
    public class WorkbookController : BaseController
    {
        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllWorkbook()
        {
            try
            {
                var query = "select * from Workbooks";
                var li = await Program.Sql.QueryAsync<Workbook>(query);
                return Ok(new
                {
                    status = true,
                    message = li
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
                var query = "select * from Workbooks where Id=@id";
                var workbook = await Program.Sql.QuerySingleAsync<Workbook>(query, new { id });
                return Ok(new
                {
                    status = true,
                    message = workbook
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
        public async Task<IActionResult> SearchByName([FromQuery] string? name)
        {
            try
            {
                name ??= "";
                var query = "select * from Workbooks where dbo.rmvAccent(Name) like concat(N'%',dbo.rmvAccent(@name),'%')";
                var li = await Program.Sql.QueryAsync<Workbook>(query);
                return Ok(new
                {
                    status = true,
                    message = li
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

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            try
            {
                var query = "delete from Workbooks where Id=@id";
                await Program.Sql.ExecuteAsync(query, new { id });
                return Ok(new
                {
                    status = true,
                    message = $"Deleted workbookId={id}"
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

        [HttpPut("edit/{workbookId:int}")]
        [RequestSizeLimit(int.MaxValue)]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public async Task<IActionResult> EditById(int workbookId, IFormCollection form)
        {
            try
            {
                var parameters = new DynamicParameters();
                var file = form.Files.GetFile("image");
                if (file != null)
                {
                    if (file.Length > Constraint.MAX_IMG_UPLOAD) return BadRequest(new
                    {
                        success = false,
                        message = Constraint.GetFileSizeErrorMsg(Constraint.MAX_IMG_UPLOAD)
                    });
                    if (!Util.IsExtAccepted(file.FileName, Constraint.ACCEPT_EXT_IMG)) return BadRequest(new
                    {
                        success = false,
                        message = Constraint.GetExtErrorMsg(Constraint.ACCEPT_EXT_IMG)
                    });


                    parameters.Add("Url", await Util.Upload(file));
                }

                if (form.ContainsKey("name")) parameters.Add("Name", form["name"].First());
                if (form.ContainsKey("description")) parameters.Add("Description", form["description"].First());

                if (!parameters.ParameterNames.Any()) return BadRequest(new
                {
                    success = false,
                    message = "No params found to perform edit"
                });

                var query = SqlHelper.GetUpdateQuery("Workbooks", "Id", parameters.ParameterNames.ToArray());
                parameters.Add("Id", workbookId);
                await Program.Sql.ExecuteAsync(query, parameters);

                return Ok(new
                {
                    success = true,
                    message = $"Edited workbook with Id={workbookId}"
                });
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
