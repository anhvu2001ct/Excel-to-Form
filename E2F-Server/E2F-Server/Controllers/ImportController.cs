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
                var workbookId = data.GetProperty("workbookId").GetString()!;
                var sheetIndex = data.GetProperty("sheetIndex").GetInt16();
                var rowIndex = data.GetProperty("rowIndex").GetInt32();
                var startCol = Util.SubMax(data.GetProperty("startCol").GetString()!, 3).ToUpperInvariant();
                var endCol = Util.SubMax(data.GetProperty("endCol").GetString()!, 3).ToUpperInvariant();

                int startColNum = SheetHelper.ColumnNameToNumber(startCol);
                int endColNum = SheetHelper.ColumnNameToNumber(endCol);

                if (startColNum > endColNum)
                {
                    (startCol, endCol) = (endCol, startCol);
                    (startColNum, endColNum) = (endColNum, startColNum);
                }

                if (endColNum > SheetHelper.ColumnNameToNumber(Constraint.MAX_COLUMN_VALID)) return BadRequest(new
                {
                    success = false,
                    message = "Column field(s) cannot exceed 'OZZ'"
                });
                
                if (endColNum - startColNum + 1 > Constraint.UPPER_COLUMN_RANGE) return BadRequest(new
                {
                    success = false,
                    message = $"Request column range cannot exceed {Constraint.UPPER_COLUMN_RANGE}"
                });

                if (!Util.DataExists(Path.Combine("sheet", workbookId))) return BadRequest(new
                {
                    success = false,
                    message = "Workbook id invalid"
                });

                using (var excel = new ExcelPackage())
                {
                    string filePath = Path.Combine(Program.RootPath, "Data", "sheet", workbookId);
                    await excel.LoadAsync(filePath);
                    var sheet = excel.Workbook.Worksheets[sheetIndex];

                    if (sheet.Hidden != eWorkSheetHidden.Visible) throw new Exception();

                    var res = SheetHelper.ValidateSheetCord(sheet, rowIndex, startCol, endCol);

                    return Ok(new
                    {
                        success = true,
                        message = new { res.Valid, res.Cord, res.Fields }
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
                    workbook.Name,
                    workbook.WorkbookId,
                    workbook.Description,
                    workbook.Extension
                });

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
