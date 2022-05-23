using Microsoft.AspNetCore.Mvc;

namespace E2F_Server.Controllers
{
    public class WelcomeController : BaseController
    {
        [HttpGet]
        public ActionResult<object> Get()
        {

            return new
            {
                greeting = "Welcome to Excel2Form API Server",
                version = "1.0"
            };
        }
    }
}
