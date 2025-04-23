namespace Graphic_Neural_Network.backend.Models
{
    public class NumberGenerator
    {
        public int Seed { get; set; }
        public Random r = new Random();
        public double genarate(double minValue, double maxValue)
        {
            return r.NextDouble() * (maxValue - minValue) + minValue;
        }
    }
}
