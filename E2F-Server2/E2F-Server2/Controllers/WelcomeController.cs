using Microsoft.AspNetCore.Mvc;

namespace E2F_Server2.Controllers
{
    public class WelcomeController : BaseController
    {
        [HttpGet]
        public ActionResult<object> Get()
        {

            return new
            {
                greeting = "Welcome to Excel2Form API Server",
                version = "2.0"
            };
        }
    }
}
