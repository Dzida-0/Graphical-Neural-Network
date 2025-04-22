using Microsoft.AspNetCore.Mvc;
using Graphic_Neural_Network.backend.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace Graphic_Neural_Network.backend.Controlers
{
    public class GeneratePlotRequest
    {
        public int PageId { get; set; }
        public Dictionary<string, object> Data { get; set; } = new Dictionary<string, object>();

    }

    [ApiController]
    [Route("plot")]
    public class PlotAPI : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;

        public PlotAPI(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        // genereate data
        [HttpPost("Gen")]
        public ActionResult<PlotData> Generate([FromBody] GeneratePlotRequest request)
        {

            if (!_memoryCache.TryGetValue(request.PageId+ "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            plot.Generate();
            return Ok(plot);
        }

        // change seed
        [HttpPost("Seed")]
        public ActionResult<PlotData> ChangeSeed([FromBody] GeneratePlotRequest request)
        {
            if (!_memoryCache.TryGetValue(request.PageId + "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("seed", out var value) && value != null)
            {
                int seed = ((JsonElement)value).GetInt32();
                plot.SetSeed(seed);
                return Ok(plot);
            }
            else
            {
                return BadRequest("Missing or invalid 'seed' in request data.");
            }
        }


        // get data
        [HttpGet("{pageId}")]
        public ActionResult<Network> GetPlotData(int pageId)
        {
            if (!_memoryCache.TryGetValue(pageId + "p", out PlotData plot))
            {
                plot = new PlotData();
                _memoryCache.Set(pageId + "p", plot, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(60)
                });
            }
            return Ok(plot);
        }

        // add node
        [HttpPost("AddN")]
        public ActionResult<PlotData> AddNode([FromBody] GeneratePlotRequest request)
        {
            if (!_memoryCache.TryGetValue(request.PageId + "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("key", out var value) && value != null)
            {
                string key = value.ToString();
                plot.AddNode(key);
                return Ok(plot);
            }
            else
            {
                return BadRequest("Missing or invalid 'key' in request data.");
            }
        }

        // remove node
        [HttpPost("RemN")]
        public ActionResult<PlotData> RemoveNode([FromBody] GeneratePlotRequest request)
        {
            if (!_memoryCache.TryGetValue(request.PageId + "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("key", out var value) && value != null)
            {
                string key = value.ToString();
                plot.RemoveNode(key);
                return Ok(plot);
            }
            else
            {
                return BadRequest("Missing or invalid 'key' in request data.");
            }
        }

        // change data divider
        [HttpPost("ChDiv")] // TODO
        public ActionResult<PlotData> ChangeDivider([FromBody] GeneratePlotRequest request)
        {
            if (!_memoryCache.TryGetValue(request.PageId + "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("divider", out var valueDiv) && valueDiv != null &&
                request.Data.TryGetValue("key", out var valueKey) && valueKey != null)
            {
                string divider = valueDiv.ToString();
                string key = valueKey.ToString();
                if (plot.Tree.GetNodeByKey(key) is not MiddleTreeNode)
                     return BadRequest("Invalid 'key' in request data.");
                (plot.Tree.GetNodeByKey(key)as MiddleTreeNode).changeDivider(request.Data);
                return Ok(plot);
            }
            else
            {
                return BadRequest("Missing or invalid 'divider' or 'key' in request data.");
            }
        }

        // change points amount 
        [HttpPost("PoAm")]
        public ActionResult<PlotData> ChangePointsAmount([FromBody] GeneratePlotRequest request)
        {
            if (!_memoryCache.TryGetValue(request.PageId + "p", out PlotData plot))
            {
                return BadRequest("Plot with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("count", out var value) && value != null)
            {
                int count = ((JsonElement)value).GetInt32();
                plot.SetElementCount(count);
                return Ok(plot);
            }
            else
            {
                return BadRequest("Missing or invalid 'count' in request data.");
            }
        }
    }
}
