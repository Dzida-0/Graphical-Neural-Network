using Graphic_Neural_Network.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Encodings.Web;

namespace Graphic_Neural_Network.Controllers
{
    public class HelloWorldControler : Controller
    {
        private readonly ILogger<HelloWorldControler> _logger;

        public HelloWorldControler(ILogger<HelloWorldControler> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Welcome()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
