using Dapper;
using E2F_Server.Model;
using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Text.Json;

namespace E2F_Server.Controllers
{
    public class ImportController : BaseController
    {
        [HttpPost("sheet")]
        [RequestFormLimits(ValueLengthLimit = Constraint.MAX_UPLOAD, MultipartBodyLengthLimit = Constraint.MAX_UPLOAD)]
        public async Task<IActionResult> UploadSheet(IFormFile file)
        {
            try
            {
                if (!Util.IsExtAccepted(file.FileName, Constraint.ACCEPT_EXT_SHEET)) return BadRequest(new
                {
                    success = false,
                    message = Constraint.GetExtErrorMsg(Constraint.ACCEPT_EXT_SHEET)
                });

                var res = await WorkbookHelper.GetWorkbookPreImport(file);
                if (res == null) return BadRequest(new
                {
                    success = false,
                    message = "Request params not valid"
                });

                return Ok(new
                {
                    success = true,
                    message = res
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

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateStructure(JsonElement data)
        {
            try
            {
                var sheetId = data.GetProperty("sheetId").GetString()!;
                var sheetIndex = data.GetProperty("sheetIndex").GetInt16();
                var rowIndex = data.GetProperty("rowIndex").GetInt16();
                var startCol = data.GetProperty("startCol").GetString()!;
                var endCol = data.GetProperty("endCol").GetString()!;


                if (!Util.DataExists(sheetId)) return BadRequest(new
                {
                    success = false,
                    message = "Sheet id invalid"
                });

                using (var excel = new ExcelPackage())
                {
                    string filePath = Path.Combine(Program.RootPath, "Data", "structure", sheetId);
                    await excel.LoadAsync(filePath);
                    var sheet = excel.Workbook.Worksheets[sheetIndex];

                    if (sheet.Hidden != eWorkSheetHidden.Visible) throw new Exception();

                    return Ok(new
                    {
                        success = true,
                        message = SheetHelper.ValidateSheetCord(sheet, rowIndex, startCol, endCol)
                    });
                }
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

        [HttpPost("submit")]
        public async Task<IActionResult> Import(WorkbookPreImport workbook)
        {
            try
            {
                var query = SqlHelper.GetInsertIdQuery("Workbook", "Id", "Name", "WorkbookId", "Description", "Extension");
                int workbookId = await Program.Sql.ExecuteScalarAsync<int>(query, new
                {
                    Name = workbook.Name,
                    WorkbookId = workbook.WorkbookId,
                    Description = workbook.Description,
                    Extension = workbook.Extension
                });
                //Console.WriteLine($"Inserted id = {workbookId}");

                var wbDetail = new WorkbookStructure();

                using (var excel = new ExcelPackage())
                {
                    string filePath = Path.Combine(Program.RootPath, "Data", "sheet", workbook.WorkbookId);
                    await excel.LoadAsync(filePath);

                    var sheets = excel.Workbook.Worksheets;
                    int num = workbook.Sheets.Count;
                    wbDetail.Order.Capacity = num;
                    for (int i = 0; i < num; ++i)
                    {
                        var structure = SheetHelper.GetStructure(sheets, workbook.Sheets[i].SheetIndex, workbook.Sheets[i]);
                        var tableName = await SqlHelper.RandomTableName(workbookId);
                        query = SqlHelper.GetCreateQuery(tableName, SqlHelper.RandomColumnsName(structure.Columns.Count));
                        await Program.Sql.ExecuteAsync(query);
                        wbDetail.Order.Add(tableName);
                        wbDetail.Sheets[tableName] = structure;
                    }
                }

                await Util.WriteData(Path.Combine("structure", $"{workbookId}.json"), wbDetail);

                return Ok(new
                {
                    success = true,
                    message = "Imported new data"
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
