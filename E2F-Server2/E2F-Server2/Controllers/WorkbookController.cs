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
        public async Task<IActionResult> GetWorkbook([FromQuery] int id)
        {
            try
            {
                if (!await SqlHelper.RecordExists("Workbooks", id)) return BadRequest(new
                {
                    success = false,
                    message = $"Workbook with id={id} does not existed!"
                });

                return Ok(new
                {
                    status = true,
                    message = await WorkbookHelper.GetWorkbookSheets(id)
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
                var query = "select * from Workbooks where dbo.rmvAccent(Name) like concat('%',dbo.rmvAccent(@name),'%')";
                var li = await Program.Sql.QueryAsync<Workbook>(query, new { name });
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
                var result = await Program.Sql.ExecuteAsync(query, new { id });

                if (result == 0) return BadRequest(new
                {
                    status = false,
                    message = $"Workbook with id={id} does not existed!"
                });

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

        [HttpPut("edit/{id:int}")]
        [RequestSizeLimit(int.MaxValue)]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public async Task<IActionResult> EditById(int id, IFormCollection form)
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
                    message = "At least one input must be specified"
                });

                var query = SqlHelper.GetUpdateQuery("Workbooks", "Id", parameters.ParameterNames.ToArray());
                parameters.Add("Id", id);
                var result = await Program.Sql.ExecuteAsync(query, parameters);
                if (result == 0) return BadRequest(new
                {
                    status = false,
                    message = $"Workbook with id={id} does not existed!"
                });

                return Ok(new
                {
                    success = true,
                    message = $"Edited workbook with Id={id}"
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
