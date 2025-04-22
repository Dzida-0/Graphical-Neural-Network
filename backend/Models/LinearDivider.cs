namespace Graphic_Neural_Network.backend.Models
{
    using Newtonsoft.Json.Linq;
    using System;
    using static System.Net.Mime.MediaTypeNames;

    public class LinearDivider : DataDivider
    {
        public override string Type => "lineardivider";

        public override bool Evaluate(double x, double y)
        {
            double theta = Deg * Math.PI / 180 + Math.PI * 5 / 4;
            double sinT = Math.Sin(theta);
            double cosT = Math.Cos(theta);

            double transformedX = cosT * (y + ShiftY) - sinT * (x - ShiftX);
            double transformedY = sinT * (y + ShiftY) + cosT * (x - ShiftX);

            return transformedX < transformedY;
        }
    }

}
