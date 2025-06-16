using Microsoft.AspNetCore.Mvc;
using HelloGravel.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace HelloGravel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private static readonly List<CartItem> Cart = new();
        private static int NextId = 1;

        [HttpGet]
        public IActionResult GetCart() => Ok(Cart);

        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItem item)
        {
            item.Id = NextId++;
            Cart.Add(item);
            // RETURN 201 with body:
            return CreatedAtAction(nameof(AddToCart), new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            var existing = Cart.FirstOrDefault(ci => ci.Id == id);
            if (existing == null) return NotFound();
            Cart.Remove(existing);
            return NoContent();
        }
    }
}