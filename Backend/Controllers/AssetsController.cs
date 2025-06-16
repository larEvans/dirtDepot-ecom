using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace HelloGravel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        [HttpGet("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var path = Path.Combine("wwwroot/assets/images", fileName);
            if (!System.IO.File.Exists(path))
                return NotFound();
            var mime = "image/" + Path.GetExtension(path).TrimStart('.');
            return PhysicalFile(path, mime);
        }
    }
}