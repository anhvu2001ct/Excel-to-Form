using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace E2F_Server.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [EnableCors]
    public abstract class BaseController : ControllerBase
    {
    }
}