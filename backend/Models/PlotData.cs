namespace Graphic_Neural_Network.backend.Models
{
    public class PlotData
    {


        public int ElementCount { get; set; }
        public int ClassCount { get; set; }
        public Point[] Points { get; set; }
        public double[] ClassProbability { get; set; }
        private NumberGenerator _numberGenerator { get; set; }

        public PlotData()
        {
            ElementCount = 100;
            ClassCount = 2;
            ClassProbability = new double[] { 0.5 , 0.5};
            Points = new Point[ElementCount];
            _numberGenerator = new NumberGenerator();
        }

        public void GenerateLinearPoints()
        {
            double a = _numberGenerator.genarate(-1,1);
            double b = _numberGenerator.genarate(-0.5,0.5);
            double y, x;
            int pointClass;
            for (int i = 0; i < ElementCount; i++)
            {
                x = _numberGenerator.genarate(-1, 1);
                if (_numberGenerator.genarate(-0.5, 0.5) < 0.5)
                {
                    pointClass = 0;
                    y = _numberGenerator.genarate( - 1, a * x + b);
                }
                else
                {
                    pointClass = 1;
                    y = _numberGenerator.genarate(a * x + b, 1);
                }
                Points[i] = new Point(i, x *100, y * 100, pointClass);
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
