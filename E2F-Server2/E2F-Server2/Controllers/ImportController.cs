using Dapper;
using E2F_Server2.Model;
using E2F_Server2.Utilities;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Text.Json;

namespace E2F_Server2.Controllers
{
    public class ImportController : BaseController
    {
        [HttpPost("workbook")]
        [RequestSizeLimit(int.MaxValue)]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public async Task<IActionResult> UploadSheet(IFormFile file)
        {
            try
            {
                if (!Util.IsExtAccepted(file.FileName, Constraint.ACCEPT_EXT_SHEET)) return BadRequest(new
                {
                    success = false,
                    message = Constraint.GetExtErrorMsg(Constraint.ACCEPT_EXT_SHEET)
                });

                if (file.Length > Constraint.MAX_EXCEL_UPLOAD) return BadRequest(new
                {
                    success = false,
                    message = Constraint.GetFileSizeErrorMsg(Constraint.MAX_EXCEL_UPLOAD)
                });

                var res = await WorkbookHelper.GetWorkbookImport(file);
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
                var fileName = data.GetProperty("fileName").GetString()!;
                var sheetIndex = data.GetProperty("sheetIndex").GetInt16();
                var rowIndex = data.GetProperty("headerStartRow").GetInt32();
                var startCol = Util.SubMax(data.GetProperty("headerStartCol").GetString() ?? "", 3).ToUpperInvariant();
                var endCol = Util.SubMax(data.GetProperty("headerEndCol").GetString() ?? "", 3).ToUpperInvariant();

                if (rowIndex < 1) return BadRequest(new
                {
                    success = false,
                    message = "Row index must be a positive integer"
                });

                if (startCol == "" || endCol == "") return BadRequest(new
                {
                    success = false,
                    message = "Columns cannot be empty"
                });

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

                if (!Util.DataExists(fileName)) return BadRequest(new
                {
                    success = false,
                    message = "Workbook id invalid"
                });

                using (var excel = new ExcelPackage())
                {
                    string filePath = Util.GetDataPath(fileName);
                    await excel.LoadAsync(filePath);
                    var sheet = excel.Workbook.Worksheets[sheetIndex];

                    if (sheet.Hidden != eWorkSheetHidden.Visible) throw new Exception();

                    var res = SheetHelper.ValidateSheetImport(sheet, rowIndex, startCol, endCol);

                    return Ok(new
                    {
                        success = true,
                        message = new
                        {
                            res.Valid,
                            Sheet = new
                            {
                                res.Sheet.HeaderStartRow,
                                res.Sheet.HeaderEndRow,
                                res.Sheet.HeaderStartCol,
                                res.Sheet.HeaderEndCol,
                                res.Sheet.Columns
                            }
                        }
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
        public async Task<IActionResult> Import(JsonElement json)
        {
            try
            {
                var workbook = json.GetObject<WorkbookImport>();
                
                foreach (var sheet in workbook.Sheets)
                {
                    if (!sheet.Valid) return BadRequest(new
                    {
                        success = false,
                        message = "All sheet(s) must be valid"
                    });
                }
                
                var query = SqlHelper.GetInsertIdQuery("Workbooks", "Id", "Name", "FileName", "Description");
                workbook.Workbook.Id = await Program.Sql.ExecuteScalarAsync<int>(query, new
                {
                    workbook.Workbook.Name,
                    workbook.Workbook.FileName,
                    workbook.Workbook.Description
                });

                using (var excel = new ExcelPackage())
                {
                    string filePath = Util.GetDataPath(workbook.Workbook.FileName);
                    await excel.LoadAsync(filePath);

                    var sheets = excel.Workbook.Worksheets;
                    
                    query = SqlHelper.GetInsertIdQuery("Sheets", "Id", "Name", "HeaderStartRow", "HeaderEndRow", "HeaderStartCol", "HeaderEndCol", "SheetIndex", "WorkbookId");
                    foreach (var _sheet in workbook.Sheets)
                    {
                        var sheet = _sheet.Sheet;
                        sheet.Id = await Program.Sql.ExecuteScalarAsync<int>(query, new {
                            sheet.Name,
                            sheet.HeaderStartRow,
                            sheet.HeaderEndRow,
                            sheet.HeaderStartCol,
                            sheet.HeaderEndCol,
                            sheet.SheetIndex,
                            WorkbookId = workbook.Workbook.Id
                        });
                        var excelSheet = sheets[sheet.SheetIndex];
                        await SheetHelper.InsertSheetColumns(sheets, excelSheet, sheet);
                    }
                }

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
