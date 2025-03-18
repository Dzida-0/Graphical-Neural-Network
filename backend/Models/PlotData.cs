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
                Points[i] = new Point(i, x *100, y * 100, pointClass); ;
            }

        }

        public void GenerateCirclePoints()
        {
            Random random = new Random();
            double y, x;
            int pointClass;
            for (int i = 0; i < ElementCount; i++)
            {
                
                if (random.NextDouble() < 0.5)
                {
                    pointClass = 0;
                    x = random.NextDouble()  - 0.5;
                    y = random.NextDouble() - 0.5;

                }
                else
                {
                    pointClass = 1;
                    x = random.NextDouble() - 0.5;
                    if (x < 0) x -= 0.5;
                    else x += 0.5;
                    y = random.NextDouble() - 0.5;
                    if (y < 0) y -= 0.5;
                    else y += 0.5;
                }
                Points[i] = new Point(i, x * 100, y * 100, pointClass); ;
            }

        }


    }

   

}
