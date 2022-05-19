using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Text.Json;

namespace E2F_Server.Controllers
{
    public class SheetController : BaseController
    {
        [HttpPost("validate")]
        public async Task<ActionResult<object>> ValidateStructure(JsonElement data)
        {
            try
            {
                var sheetId = data.GetProperty("sheetId").GetString()!;
                var offset = data.GetProperty("offset").GetInt16();
                var rowIndex = data.GetProperty("rowIndex").GetInt16();
                var startCol = data.GetProperty("startCol").GetString()!;
                var endCol = data.GetProperty("endCol").GetString()!;

                string filePath = $@"{Program.RootPath}Data\{sheetId}";

                if (!Util.DataExists(sheetId)) return BadRequest(new
                {
                    success = false,
                    message = "Sheet id invalid"
                });

                using (var excel = new ExcelPackage())
                {
                    await excel.LoadAsync(filePath);
                    var sheet = excel.Workbook.Worksheets[offset];
                    return Ok(new
                    {
                        success = true,
                        message = SheetHelper.ValidateSheet(sheet, rowIndex, startCol, endCol)
                    });
                }
            }
            catch
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Your request was not successful :("
                });
            }
        }

        [HttpPost("import")]
        public async Task<ActionResult<object>> Import(JsonElement data)
        {
            try
            {
                var workbook = data.GetObject<Workbook>()!;
                var url = await Util.Upload(workbook.Id, workbook.Name);
                await Util.WriteData($"workbook/{workbook.Name}.json", new Uploader<Workbook>
                {
                    Url = url,
                    Data = workbook
                });

                Util.DeleteData(workbook.Id);
                return Ok(new
                {
                    success = true,
                    message = "Imported new data"
                });
            }
            catch
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Your request was not successful :("
                });
            }
        }
    }
}
