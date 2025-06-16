using Microsoft.AspNetCore.Mvc;
using HelloGravel.Api.Models;

namespace HelloGravel.Api.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSections()
        {
            var content = new[]
            {
                new PageContent { Section="hero", Html="<h1>Welcome to HelloGravel</h1>" },
                // ... add other sections
            };
            return Ok(content);
        }
    }
}