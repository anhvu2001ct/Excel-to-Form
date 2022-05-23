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
            try
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
