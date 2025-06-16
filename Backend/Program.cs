using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using HelloGravel.Api.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.Configure<StripeSettings>(
    builder.Configuration.GetSection("Stripe")
);
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");
app.MapControllers();
app.UseStaticFiles();
app.Run();