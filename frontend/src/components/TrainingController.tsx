import { useState } from "react";
import { useNetwork } from "../context/NetworkContext";
import { usePlotData } from "../context/PlotDataContext";
import NetworkLearning from "../models/NetworkLearning";

export default function TrainingController() {
    const { network, updateBias, updateWeight } = useNetwork();
    const { plotData, generateData,dataGenerated } = usePlotData();

    const [learningRate, setLearningRate] = useState(0.1);
    const [epochs, setEpochs] = useState(100);
    const [isTraining, setIsTraining] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [cost, setCost] = useState(0);
    const [activation, setActivation] = useState("sigmoid");
    const [selectedCost, setSelectedCost] = useState("mse");
    const [trainAllData, setTrainAllData] = useState(true);

    const updateMetrics = (newAccuracy: number, newCost: number) => {
        setAccuracy(newAccuracy);
        setCost(newCost);
    };


    const startTraining = async () => {
        if (!network) return;
        setIsTraining(true);
        
        await NetworkLearning(epochs, learningRate, plotData.points, network, updateMetrics);

        // ✅ Update weights and biases in the network context
        network.layers.forEach((layer, layerIndex) => {
            layer.biases.forEach((bias, neuronIndex) => {
                updateBias(layerIndex, neuronIndex, bias);
            });

            layer.weights.forEach((neuronWeights, neuronIndex) => {
                neuronWeights.forEach((weight, inputIndex) => {
                    updateWeight(layerIndex, neuronIndex, inputIndex, weight);
                });
            });
        });
        setIsTraining(false);
    };



    return (
        <div className="p-4 bg-gray-100 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800">Training Controls</h2>

            {/* Metrics */}
            <div className="flex justify-between text-sm text-gray-700">
                <h3>Accuracy: {accuracy.toFixed(2)}%</h3>
                <h3>Cost: {cost.toFixed(4)}</h3>
            </div>

            {/* Generate & Train Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => generateData()}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${!dataGenerated
                            ? "bg-blue-500 hover:bg-blue-600"
                            : isTraining
                                ? "bg-gray-400"
                                : "bg-red-500 hover:bg-red-600"
                        } text-white`}
                    disabled={isTraining}
                >
                    {!dataGenerated ? "Generate Data" : "Regenerate Data"}
                </button>
                <button
                    onClick={startTraining}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isTraining || !dataGenerated
                            ? "bg-gray-400"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                    disabled={isTraining || !dataGenerated}
                >
                    {isTraining ? "Training..." : "Start Training"}
                </button>
            </div>

            {/* Learning Rate */}
            <label className="flex justify-between items-center text-sm text-gray-700">
                <span className="bold">Learning Rate: {learningRate.toFixed(3)}</span>
                <input
                    type="number"
                    min="0.00001"
                    max="1"
                    step="0.001"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-28 px-2 py-1 border rounded-md shadow-sm"
                />
            </label>

            {/* Epochs */}
            <label className="flex justify-between items-center text-sm text-gray-700">
                <span>Epochs:</span>
                <input
                    type="number"
                    min="10"
                    max="1000"
                    step="100"
                    value={epochs}
                    onChange={(e) => setEpochs(parseInt(e.target.value))}
                    className="w-20 px-2 py-1 border rounded-md shadow-sm"
                />
            </label>

            {/* Activation Function Selector */}
            <label className="flex flex-col text-sm text-gray-700">
                <span className="mb-1">Activation Function:</span>
                <select
                    value={activation}
                    onChange={(e) => setActivation(e.target.value)}
                    className="px-2 py-1 border rounded-md shadow-sm"
                >
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                    <option value="relu">ReLU</option>
                </select>
            </label>

            {/* Cost Function Selector */}
            <label className="flex flex-col text-sm text-gray-700">
                <span className="mb-1">Cost Function:</span>
                <select
                    value={selectedCost}
                    onChange={(e) => setSelectedCost(e.target.value)}
                    className="px-2 py-1 border rounded-md shadow-sm"
                >
                    <option value="mse">Mean Squared Error</option>
                    <option value="crossentropy">Cross Entropy</option>
                </select>
            </label>

            {/* Data Scope Toggle */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <input
                    type="checkbox"
                    checked={trainAllData}
                    onChange={(e) => setTrainAllData(e.target.checked)}
                    className="w-4 h-4"
                />
                <span>Train on all data</span>
            </div>
        </div>
    );
}
