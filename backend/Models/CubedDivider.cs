namespace Graphic_Neural_Network.backend.Models
{
    using Newtonsoft.Json.Linq;
    using System;

    public class CubedDivider : DataDivider
    {
        public double Width { get; set; } = 1;
        public override string Type => "cubeddivider";

        public override bool Evaluate(double x, double y)
        {
            double theta = Deg * Math.PI / 180;
            double sinT = Math.Sin(theta);
            double cosT = Math.Cos(theta);

            double tx = cosT * (y + ShiftY) - sinT * (x - ShiftX);
            double ty = sinT * (y + ShiftY) + cosT * (x - ShiftX);

            return tx < Math.Pow(ty * Width, 3);
        }

        public virtual JObject ToJson()
        {
            var jo = new JObject();
            jo["width"] = this.Width;
            return jo;
        }
    }

}
