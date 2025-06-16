using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using HelloGravel.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly StripeSettings _stripeSettings;
    public PaymentController(IOptions<StripeSettings> options)
    {
        _stripeSettings = options.Value;
    }


    [HttpPost("create-checkout-session")]
    public IActionResult CreateCheckoutSession([FromBody] CreateCheckoutSessionRequest req)
    {
        var options = new SessionCreateOptions
        {
            PaymentMethodTypes = new List<string> { "card" },
            LineItems = new List<SessionLineItemOptions>
        {
            new()
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = req.UnitAmountCents,
                    Currency = "usd",
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = req.ProductName
                    }
                },
                Quantity = req.Quantity
            }
        },
            Mode = "payment",
            SuccessUrl = req.SuccessUrl,
            CancelUrl = req.CancelUrl
        };
        var service = new SessionService();
        var session = service.Create(options);
        return Ok(new { sessionId = session.Id });
    }

}

public class CreateCheckoutSessionRequest
{
    public string ProductName { get; set; }
    public long UnitAmountCents { get; set; }
    public long Quantity { get; set; }
    public string SuccessUrl { get; set; }
    public string CancelUrl { get; set; }
}