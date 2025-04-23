namespace Graphic_Neural_Network.backend.Models
{
    using Newtonsoft.Json.Linq;
    using System.Collections.Generic;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public class MiddleTreeNode : TreeNode
    {
        public override string Type => "middletreenode";
        
        public Dictionary<string, TreeNode> Next { get; set; }
        public DataDivider Divider { get; set; }

        public MiddleTreeNode(string key) : base(key)
        {
            Next = new Dictionary<string, TreeNode>();
            Divider = new LinearDivider(); 
        }

        

        public override JObject ToJson()
        {
            var jo = base.ToJson();
            var nextJson = new JObject();

            foreach (var nextNode in Next)
            {
                nextJson[nextNode.Key] = nextNode.Value.ToJson();
            }

            jo["next"] = nextJson;
            jo["divider"] = "dddddd";
            return jo;
        }

        public void SetDivider(DataDivider div)
        {
            Divider = div;
        }

        public void changeDivider(Dictionary<string, object> data)
        {
            if (data.TryGetValue("divider", out var valueDiv) && valueDiv != null &&
                data.TryGetValue("deg", out var valueDeg) && valueDeg != null &&
                data.TryGetValue("shiftX", out var valueX) && valueX != null &&
                data.TryGetValue("shiftY", out var valueY) && valueY != null)
            {
                switch (valueDiv)
                {
                    case "linear":
                        Divider = new LinearDivider();
                        break;
                    case "sin":
                        Divider = new SinDivider();
                        if (data.TryGetValue("amplitude", out var valueAmplitude) && valueAmplitude != null &&
                            data.TryGetValue("wavelength", out var valueWavelength) && valueWavelength != null)
                        {
                            (Divider as SinDivider).Amplitude = Convert.ToDouble(valueAmplitude);
                            (Divider as SinDivider).Wavelength = Convert.ToDouble(valueWavelength);
                        }
                        break;
                    case "squered":
                        Divider = new SquaredDivider();
                        if (data.TryGetValue("width", out var valueWidth) && valueWidth != null)
                            (Divider as SquaredDivider).Width = Convert.ToDouble(valueWidth);
                        break;
                    case "cubed":
                        Divider = new CubedDivider();
                        if (data.TryGetValue("width", out var valueWidth2) && valueWidth2 != null)
                            (Divider as CubedDivider).Width = Convert.ToDouble(valueWidth2);
                        break;
                    case "vierdical":
                        Divider = new VerdicalDivider();
                        if (data.TryGetValue("frequency", out var valueFrequency) && valueFrequency != null)
                            (Divider as VerdicalDivider).Frequency = Convert.ToDouble(valueFrequency);
                        break;
                }
                Divider.Deg = Convert.ToDouble(valueDeg);
                Divider.ShiftX = Convert.ToDouble(valueX);
                Divider.ShiftY = Convert.ToDouble(valueY);
            }
        }

        public void SetChild(TreeNode child)
        {
            Next[child.Key] = child;
        }

        public void RemoveChild(TreeNode child)
        {
            Next.Remove(child.Key);
        }
    }

}
