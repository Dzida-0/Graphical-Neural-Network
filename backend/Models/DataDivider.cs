using Newtonsoft.Json.Linq;

namespace Graphic_Neural_Network.backend.Models
{
    public abstract class DataDivider
    {
        public double Deg { get; set; } 
        public double ShiftX { get; set; } 
        public double ShiftY { get; set; } 
        public abstract string Type { get; }

        public DataDivider()
        {
            this.Deg = 0;   
            this.ShiftX = 0;
            this.ShiftY = 0;
        }

        public abstract bool Evaluate(double x, double y);

        public virtual JObject ToJson()
        {
            var jo = new JObject();
            jo["Deg"] = this.Deg;
            jo["ShiftX"] = this.ShiftX;
            jo["ShiftY"] = this.ShiftY;
            return jo;
        }
    }

}
