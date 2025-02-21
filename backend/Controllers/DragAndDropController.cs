using Graphic_Neural_Network.backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Graphic_Neural_Network.backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CircleController : ControllerBase
    {
        private static List<DragAndDropNetwork> _circles;

        public CircleController()
        {
      
            if (_circles == null || !_circles.Any())
            {
                _circles = new List<DragAndDropNetwork>
                {
                    new DragAndDropNetwork { Id = 1, PosX = 25, PosY = 33, layer = 0},
                    new DragAndDropNetwork { Id = 2, PosX = 25, PosY = 66, layer = 0},
                    new DragAndDropNetwork { Id = 3, PosX = 50, PosY = 50, layer = 1},
                    new DragAndDropNetwork { Id = 4, PosX = 75, PosY = 33, layer = 2 },
                    new DragAndDropNetwork { Id = 5, PosX = 75, PosY = 66, layer = 2 }
                };
            }
        }

        // GET: curcle
        [HttpGet]
        public IActionResult GetCircles()
        {
            return Ok(_circles);
        }

        // GET: circle/{id}
        [HttpGet("{id}")]
        public IActionResult GetCircleById(int id)
        {
            var circle = _circles.FirstOrDefault(c => c.Id == id);
            if (circle == null)
            {
                return NotFound();
            }
            return Ok(circle);
        }

        // PUT: circle/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCircle(int id, [FromBody] DragAndDropNetwork updatedCircle)
        {
            var circle = _circles.FirstOrDefault(c => c.Id == id);
            if (circle == null)
            {
                return NotFound();
            }

            // Update the circle
            circle.PosX = updatedCircle.PosX;
            circle.PosY = updatedCircle.PosY;

            return NoContent();
        }

        // DELETE: circle/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCircle(int id)
        {
            var circle = _circles.FirstOrDefault(c => c.Id == id);
            if (circle == null)
            {
                return NotFound();
            }

            _circles.Remove(circle);
            return NoContent();
        }

        // POST: circle
        [HttpPost]
        public IActionResult AddCircle([FromBody] DragAndDropNetwork newCircle)
        {
            newCircle.Id = _circles.Max(c => c.Id) + 1; // Auto-increment the ID
            _circles.Add(newCircle);
            return CreatedAtAction(nameof(GetCircleById), new { id = newCircle.Id }, newCircle);
        }
    }
}
