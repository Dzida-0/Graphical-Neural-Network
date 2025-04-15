import { useState } from "react";
import { useNetwork } from "../context/NetworkContext";
import { usePlotData } from "../context/PlotDataContext";
import NetworkLearning from "../models/NetworkLearning";

export default function TrainingController() {
    const { network, updateBias, updateWeight } = useNetwork();
    const { plotData } = usePlotData();

    const [learningRate, setLearningRate] = useState(0.1);
    const [epochs, setEpochs] = useState(100);
    const [isTraining, setIsTraining] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [cost, setCost] = useState(0);

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
        <div className="p-4 bg-gray-200 rounded-lg flex flex-col gap-4">
            <h2 className="text-lg font-bold">Training Controls</h2>

            {/* Learning Rate Slider */}
            <label className="flex justify-between">
                <span>Learning Rate: {learningRate.toFixed(3)}</span>
                <input
                    type="number"
                    min="0.00001"
                    max="1"
                    step="0.001"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-32"
                />
            </label>

            {/* Epochs Input */}
            <label className="flex justify-between">
                <span>Epochs:</span>
                <input
                    type="number"
                    min="10"
                    max="1000"
                    step="100"
                    value={epochs}
                    onChange={(e) => setEpochs(parseInt(e.target.value))}
                    className="w-20 border p-1 rounded"
                />
            </label>
            {/* Buttons 
            <button
                onClick={() => generateData()}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Generate
            </button>  
            */}
            {/* Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={startTraining}
                    className={`px-4 py-2 rounded text-white ${isTraining ? "bg-gray-500" : "bg-green-500"}`}
                    disabled={isTraining}
                >
                    {isTraining ? "Training..." : "Start Training"}
                </button>
            </div>
            <div>
                <h3>Accuracy: {accuracy.toFixed(2)}%</h3>
                <h3>Cost: {cost.toFixed(4)}</h3>
            </div>
        </div>
    );
}
