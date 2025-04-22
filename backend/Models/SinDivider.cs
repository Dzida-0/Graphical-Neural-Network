namespace Graphic_Neural_Network.backend.Models
{
    using System;

    public class SinDivider : DataDivider
    {
        public override string Type => "sindivider";
        public double Wavelength { get; set; }
        public double Amplitude { get; set; }

        public SinDivider()
        {
            Wavelength = 1;
            Amplitude = 1;
        }

        public override bool Evaluate(double x, double y)
        {
            double theta = Deg * Math.PI / 180;
            double sinT = Math.Sin(theta);
            double cosT = Math.Cos(theta);

            double shiftedY = y + ShiftY;
            double shiftedX = x - ShiftX;

            double projection = sinT * shiftedY + cosT * shiftedX;
            return cosT * shiftedY - sinT * shiftedX < Math.Sin(projection * Wavelength) * Amplitude;
        }
    }

}
