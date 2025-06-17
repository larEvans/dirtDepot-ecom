using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System;
using System.Text.Json;

namespace HelloGravel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistanceController : ControllerBase
    {
        private readonly string _apiKey;
        private static readonly HttpClient _http = new HttpClient();
        private const string BaseAddress = "1600 Amphitheatre Parkway, Mountain View, CA"; // your depot address

        public DistanceController(IConfiguration config)
        {
            _apiKey = config["GoogleMaps:ApiKey"];
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string address)
        {
            var url = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={Uri.EscapeDataString(BaseAddress)}&destinations={Uri.EscapeDataString(address)}&key={_apiKey}";
            var json = await _http.GetStringAsync(url);
            var root = JsonDocument.Parse(json).RootElement;
            var element = root.GetProperty("rows")[0].GetProperty("elements")[0];
            var distanceText = element.GetProperty("distance").GetProperty("text").GetString();
            return Ok(new { distance = distanceText });
        }
    }
}