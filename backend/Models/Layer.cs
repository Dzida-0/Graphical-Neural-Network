namespace Graphic_Neural_Network.backend.Models
{
    public class Layer
    {
        public int NeuronsNumber { get; set; }
        public int PrevLayerNeuronsNumber { get; set; }
        public List<double> Biases { get; set; }
        public List<List<double>> Weights { get; set; }

        public Layer(int neurons, int prevLayerNeurons, List<double>? biases = null, List<List<double>>? weights = null)
        {
            NeuronsNumber = neurons;
            PrevLayerNeuronsNumber = prevLayerNeurons;
            Biases = biases ?? new List<double>(new double[neurons]);

            if (weights != null)
            {
                Weights = weights;
            }
            else
            {
                var rand = new Random();
                Weights = new List<List<double>>();
                for (int i = 0; i < neurons; i++)
                {
                    var weightRow = new List<double>();
                    for (int j = 0; j < prevLayerNeurons; j++)
                    {
                        weightRow.Add(rand.NextDouble() * 2 - 1);
                    }
                    Weights.Add(weightRow);
                }
            }
        }

        public void AddNeuron()
        {
            NeuronsNumber++;
            Biases.Add(0);
            Weights.Add(new List<double>(new double[PrevLayerNeuronsNumber]));
        }

        public void RemoveNeuron(int neuronNumber)
        {
            NeuronsNumber--;
            Biases.RemoveAt(neuronNumber);
            Weights.RemoveAt(neuronNumber);
        }

        public void UpdateBias(int neuronNumber, double newBias)
        {
            Biases[neuronNumber] = newBias;
        }

        public void UpdateWeight(int neuronNumber, int inputNumber, double newWeight)
        {
            Weights[neuronNumber][inputNumber] = newWeight;
        }
    }
}
