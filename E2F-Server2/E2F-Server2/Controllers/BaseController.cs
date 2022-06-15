using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server2.Controllers
{
    [ApiController]
    [Route("api/v2/[controller]")]
    [EnableCors]
    public abstract class BaseController : ControllerBase
    {
    }
}