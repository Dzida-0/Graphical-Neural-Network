using Newtonsoft.Json.Linq;

namespace Graphic_Neural_Network.backend.Models
{
    public class EndTreeNode : TreeNode
    {
        public override string Type => "endtreenode";

        public string Value { get; set; }

        public EndTreeNode(string value, string key) : base(key)
        {
            Value = value;
        }

       

        public override JObject ToJson()
        {
            var jo = base.ToJson();
            jo["value"] = this.Value;
            return jo;
        }

        public void SetValue(string newVal)
        {
            Value = newVal;
        }
    }

}
