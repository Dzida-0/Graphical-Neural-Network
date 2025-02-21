namespace Graphic_Neural_Network.backend.Models
{
    public class DragAndDropNetwork
    {
        public int Id { get; set; }
        public int layer { get; set; }
        public double PosX { get; set; }
        public double PosY { get; set; }
    }
    public class LayerControl
    {
        public int MaxLayers { get; }
        public int LayerCount { get; private set; }
        public List<Layer> LayerList { get; }

        public LayerControl()
        {
            MaxLayers = 5;
            LayerCount = 0;
            LayerList = new List<Layer>();

        }
        public LayerControl(int maxLayers,int layerCount, List<Layer> layerList)
        {
            MaxLayers = maxLayers;
            LayerCount = layerCount;
            LayerList = layerList;

        }
        public void AddNewLayer()
        {
            if(LayerCount < MaxLayers)
            {
                LayerCount++;
                //LayerList.Add(new Layer());
            }
        }
        public void RemoveLayer()
        {
            if (LayerCount > 2)
            {
                LayerCount--;

            }
        }
    }
    public class Layer
    {
        public int MaxNodes { get; }
        public int LayerNumber { get; private set; }
        public int NodesCount {  get; private set; }
        public List<Node> NodesList { get;}

        public Layer(int layerNumber)
        {
            LayerNumber = layerNumber;
            MaxNodes = 15;
            NodesCount = 1;
            NodesList = new List<Node>();
            NodesList.Add(new Node(0, 50,50));
        }

        public void AddNode()
        {
            if (NodesCount < MaxNodes)
            {
                NodesList.Add(new Node(NodesCount, 50, 50));
                NodesCount++;
                for (int i = 0; i < NodesCount; i++)
                {
                    NodesList[i].Move(NodesList[i].PosX, (i + 1) * 100);

                }
            }
        }

        public void RemoveNode()
        {

        }
    }
    public class Node
    {
        public int Id { get; private set; } 
        public double PosX { get; private set; }
        public double PosY { get; private set; }

        public Node(int id, double posX, double posY)
        {
            Id = id;
            PosX = posX;
            PosY = posY;
        }
        public void Move(double x, double y)
        {
            PosX = x;
            PosY = y;
        }
    }
}
