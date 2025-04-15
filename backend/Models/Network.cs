namespace Graphic_Neural_Network.backend.Models
{
    public class Network
    {
        public List<Layer> Layers { get; set; }
        public int MaxHiddenLayers { get; set; } = 4;
        public int MaxNeurons { get; set; } = 10;
        public int InputsNumber { get; set; } = 2;
        public int OutputsNumber { get; set; } = 2;
        public int HiddenLayerCount { get; set; } = 4;
        public Dictionary<string, bool> Collapsed { get; set; } = new Dictionary<string, bool> {{ "Network", false },{ "Sliders", false} };

        public Network()
        {
            Layers = new List<Layer>
            {
                new Layer(4, 2),
                new Layer(2, 4),
                new Layer(10, 2),
                new Layer(7, 10),
                new Layer(2, 10)
            };
        }

        public void AddNode(int layerNumber)
        {
            if (Layers[layerNumber].NeuronsNumber >= MaxNeurons || layerNumber >= HiddenLayerCount)
                return;

            Layers[layerNumber].AddNeuron();
            if (layerNumber < HiddenLayerCount)
            {
                foreach (var weightRow in Layers[layerNumber + 1].Weights)
                {
                    weightRow.Add(0);
                }
            }
        }

        public void RemoveNode(int layerNumber, int neuronNumber)
        {
            if (layerNumber >= HiddenLayerCount)
                return;

            if (Layers[layerNumber].NeuronsNumber == 1)
            {
                RemoveLayer(layerNumber);
                return;
            }

            Layers[layerNumber].RemoveNeuron(neuronNumber);
            foreach (var weightRow in Layers[layerNumber + 1].Weights)
            {
                weightRow.RemoveAt(neuronNumber);
            }
        }

        public void AddLayer(int index)
        {
            if (HiddenLayerCount == MaxHiddenLayers)
                return;

            var newLayer = index == 0
                ? new Layer(1, 2)
                : new Layer(1, Layers[index].NeuronsNumber);

            Layers.Insert(index, newLayer);
            Layers[index + 1].PrevLayerNeuronsNumber = 1;
            Layers[index + 1].Weights = new List<List<double>>();
            for (int i = 0; i < Layers[index + 1].NeuronsNumber; i++)
            {
                Layers[index + 1].Weights.Add(new List<double> { 0 });
            }

            HiddenLayerCount++;
        }

        public void RemoveLayer(int layerNumber)
        {
            if (HiddenLayerCount == 1 || HiddenLayerCount == layerNumber)
                return;

            Layers[layerNumber + 1].PrevLayerNeuronsNumber = Layers[layerNumber].PrevLayerNeuronsNumber;
            Layers[layerNumber + 1].Weights = new List<List<double>>();
            for (int i = 0; i < Layers[layerNumber + 1].NeuronsNumber; i++)
            {
                Layers[layerNumber + 1].Weights.Add(new List<double>(new double[Layers[layerNumber].PrevLayerNeuronsNumber]));
            }

            Layers.RemoveAt(layerNumber);
            HiddenLayerCount--;
        }

        public void UpdateBiases(int layerNumber, int neuronNumber, double newBias)
        {
            Layers[layerNumber].UpdateBias(neuronNumber, newBias);
        }

        public void UpdateWeights(int layerNumber, int neuronNumber, int inputNumber, double newWeight)
        {
            Layers[layerNumber].UpdateWeight(neuronNumber, inputNumber, newWeight);
        }

        public void UpdateClassCount(int count)
        {
            if ((count == -1 && OutputsNumber == 2) || (count == 1 && OutputsNumber == 5))
                return;

            OutputsNumber += count;

            if (count < 0)
            {
                Layers[HiddenLayerCount].RemoveNeuron(Layers[HiddenLayerCount].NeuronsNumber - 1);
            }
            else
            {
                Layers[HiddenLayerCount].AddNeuron();
            }
        }

        public void UpdateCollapsed(string key , bool value) 
        {
            if (Collapsed.ContainsKey(key))
            {
                Collapsed[key] = value;
            }
        }
    }
}
