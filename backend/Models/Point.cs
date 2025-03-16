namespace Graphic_Neural_Network.backend.Models
{
    public class Point
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Class { get; set; }

        public Point(int id, double posX, double posY, double piontClass)
        {
            Id = id;
            X = posX;
            Y = posY;
            Class = piontClass;
        }
    }
}
