using Microsoft.AspNetCore.Mvc;
using Graphic_Neural_Network.backend.Models;

namespace Graphic_Neural_Network.backend.Controlers
{
    public class GeneratePlotRequest
    {
        public int pageId { get; set; } 
        public int pointCount { get; set; } 
    }

    [ApiController]
    [Route("api/plot")]
    public class PlotAPI : ControllerBase
    {
        private Dictionary<int, PlotData> _data = new Dictionary<int, PlotData>();

        [HttpPost("generate")]
        public ActionResult<PlotData> GeneratePlot([FromBody] GeneratePlotRequest request)
        {
            _data[request.pageId] = new PlotData();
            _data[request.pageId].GenerateCirclePoints();
            return Ok(_data[request.pageId]);
        }

        [HttpPost("change")]
        public ActionResult<PlotData> ChangePlot([FromBody] GeneratePlotRequest request)
        {
            _data[request.pageId] = new PlotData();

            return Ok(_data[request.pageId]);
        }

        [HttpGet]
        public ActionResult<PlotData> Get([FromBody] GeneratePlotRequest request)
        {
            return Ok(_data[request.pageId]);
        }

    }
}
