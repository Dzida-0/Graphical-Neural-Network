using Newtonsoft.Json.Linq;

namespace Graphic_Neural_Network.backend.Models
{
    public abstract class TreeNode
    {
        public string Key { get; set; }
        public abstract string Type { get; }

        public TreeNode(string key)
        {
            Key = key;
        }

        public virtual JObject ToJson()
        {
            var jo = new JObject();
            jo["key"] = this.Key;
            jo["type"] = this.Type;
            return jo;
        }
    }
}
