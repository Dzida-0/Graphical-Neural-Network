namespace Graphic_Neural_Network.backend.Models
{
    public class PlotData
    {


        public int ElementCount { get; set; }
        public int ClassCount { get; set; }
        public Point[] Points { get; set; }

        public PlotData()
        {
            ElementCount = 100;
            ClassCount = 2;
            Points = new Point[ElementCount];
        }

        public void GenerateLinearPoints()
        {
            Random random = new Random();
            double a = random.NextDouble() * 2 - 1;
            double b = random.NextDouble() - 0.5;
            double y, x;
            int pointClass;
            for (int i = 0; i < ElementCount; i++)
            {
                x = random.NextDouble() * 2 - 1;
                if (random.NextDouble() < 0.5)
                {
                    pointClass = 0;
                    y = random.NextDouble() * (a * x + b + 1) - 1;
                }
                else
                {
                    pointClass = 1;
                    y = random.NextDouble() * (1 - a * x + b) + a * x + b;
                }
                Points[i] = new Point(i, x, y, pointClass); ;
            }

        }


    }

   

}
