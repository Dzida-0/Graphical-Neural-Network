namespace Graphic_Neural_Network.backend.Models
{
    using System;

    public class VerdicalDivider : DataDivider
    {
        public double Frequency { get; set; }
        public override string Type => "verdicaldivider";

        public VerdicalDivider()
        {
            Frequency = 1;
        }

        public override bool Evaluate(double x, double y)
        {
            double theta = Deg * Math.PI / 180;
            double sinT = Math.Sin(theta);
            double cosT = Math.Cos(theta);

            double shiftedY = y + ShiftY;
            double shiftedX = x - ShiftX;

            double projection = sinT * shiftedY + cosT * shiftedX;
            return cosT * shiftedY - sinT * shiftedX < Math.Tan(projection * Frequency) * 1000 + 20;
        }
    }

}
