using Microsoft.AspNetCore.Mvc;

namespace E2F_Server.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public abstract class BaseController : ControllerBase
    {
    }
}