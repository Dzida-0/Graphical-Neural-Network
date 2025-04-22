using Microsoft.AspNetCore.Mvc;
using Graphic_Neural_Network.backend.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json.Linq;

namespace Graphic_Neural_Network.backend.Controllers
{
    public class NetworkRequest
    {
        public int PageId { get; set; }
        public Dictionary<string, object> Data { get; set; } = new Dictionary<string, object>();
    }

    [ApiController]
    [Route("network")]
    public class NetworkAPI : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;

        public NetworkAPI(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        [HttpPost("AddN")]
        public ActionResult<Network> AddNode([FromBody] NetworkRequest request)
        {
            
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("layerIndex", out var value) && value != null)
            {
                int layerIndex = Convert.ToInt32(value);
                network.AddNode(layerIndex);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid 'layerIndex' in request data.");
            }
        }

        [HttpPost("RemN")]
        public ActionResult<Network> RemoveNode([FromBody] NetworkRequest request)
        {
            
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("layerIndex", out var value) && value != null &&
                request.Data.TryGetValue("neuronIndex", out var value2) && value2 != null)
           
            {
                try
                {
                    int layerIndex = Convert.ToInt32(value);
                    int neuronIndex = Convert.ToInt32(value2);
                    network.RemoveNode(layerIndex, neuronIndex);
                    return Ok(network);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error parsing indices: {ex.Message}");
                }
            }

            return BadRequest("Missing or invalid 'layerIndex' or 'neuronIndex' in request data.");
        }

        [HttpPost("AddL")]
        public ActionResult<Network> AddLayer([FromBody] NetworkRequest request)
        {
            
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("index", out var value) && value != null)
            {
                int index = Convert.ToInt32(value);
                network.AddLayer(index);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid 'index' in request data.");
            }
        }

        [HttpPost("RemL")]
        public ActionResult<Network> RemoveLayer([FromBody] NetworkRequest request)
        {
           
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("index", out var value) && value != null)
            {
                int index = Convert.ToInt32(value);
                network.RemoveLayer(index);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid 'index' in request data.");
            }
        }

        [HttpPost("UpdB")]
        public ActionResult<Network> UpdateBiases([FromBody] NetworkRequest request)
        {

            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("layerIndex", out var li) && li != null &&
                request.Data.TryGetValue("neuronIndex", out var ni) && ni != null &&
                request.Data.TryGetValue("newBias", out var nb) && nb != null)
            {
                int layerIndex  = Convert.ToInt32(li);
                int neuronIndex = Convert.ToInt32(ni);
                double newBias = Convert.ToDouble(nb);

                network.UpdateBiases(layerIndex, neuronIndex, newBias);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid bias update data.");
            }
        }

        [HttpPost("UpdW")]
        public ActionResult<Network> UpdateWeights([FromBody] NetworkRequest request)
        {

            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("layerIndex", out var li) && li != null &&
                request.Data.TryGetValue("neuronIndex", out var ni) && ni != null &&
                request.Data.TryGetValue("inputIndex", out var ii) && ii != null &&
                request.Data.TryGetValue("newWeight", out var nw) && nw != null)
            {
                int layerIndex = Convert.ToInt32(li);
                int neuronIndex = Convert.ToInt32(ni);
                int inputIndex = Convert.ToInt32(ii);
                double newWeight = Convert.ToDouble(nw);

                network.UpdateWeights(layerIndex, neuronIndex, inputIndex, newWeight);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid weight update data.");
            }
        }

        [HttpPost("UpdCC")]
        public ActionResult<Network> UpdateClassCount([FromBody] NetworkRequest request)
        {
        
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            if (request.Data.TryGetValue("count", out var countVal) && countVal != null)
            {
                int count = Convert.ToInt32(countVal);
                network.UpdateClassCount(count);
                return Ok(network);
            }
            else
            {
                return BadRequest("Missing or invalid 'count' in request.");
            }
        }

        [HttpGet("{pageId}")]
        public ActionResult<Network> GetNetwork(int pageId)
        {
            if (!_memoryCache.TryGetValue(pageId, out Network network))
            {
                network = new Network();
                _memoryCache.Set(pageId, network, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(60)
                });
            }
           

            return Ok(network);
        }

        [HttpPost("remove")]
        public ActionResult<string> RemoveNetwork([FromBody] NetworkRequest request)
        {
           
            if (!_memoryCache.TryGetValue(request.PageId, out Network network))
            {
                return BadRequest("Network with the given 'PageId' does not exist.");
            }

            _memoryCache.Remove(request.PageId);
            return Ok("Network removed");
        }

        [HttpPost("cleanup")]
        public IActionResult Cleanup()
        {
            HttpContext.Session.Clear();
            return Ok("Session cleared");
        }
    }
}
