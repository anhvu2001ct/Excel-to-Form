using E2F_Server.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server.Controllers
{
    public class UploadController : BaseController
    {
        [HttpPost("image")]
        [RequestFormLimits(ValueLengthLimit = Constraint.MAX_IMG_UPLOAD, MultipartBodyLengthLimit = Constraint.MAX_IMG_UPLOAD)]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (!Util.IsExtAccepted(file.FileName, Constraint.ACCEPT_EXT_IMG)) return BadRequest(new
            {
                success = false,
                message = Constraint.GetExtErrorMsg(Constraint.ACCEPT_EXT_IMG)
            });

            var res = await Util.Upload(file);

            return Ok(new
            {
                success = true,
                message = res
            });
        }

        [HttpPost("sheet")]
        [RequestFormLimits(ValueLengthLimit = Constraint.MAX_UPLOAD, MultipartBodyLengthLimit = Constraint.MAX_UPLOAD)]
        public async Task<IActionResult> UploadSheet(IFormFile file)
        {
            if (!Util.IsExtAccepted(file.FileName, Constraint.ACCEPT_EXT_SHEET)) return BadRequest(new
            {
                success = false,
                message = Constraint.GetExtErrorMsg(Constraint.ACCEPT_EXT_SHEET)
            });

            var res = await SheetHelper.GetWorkbook(file);

            return Ok(new
            {
                success = true,
                message = res
            });
        }
    }
}
