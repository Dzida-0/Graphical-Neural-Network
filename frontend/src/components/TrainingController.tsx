import { useState } from "react";
import { useNetwork } from "../context/NetworkContext";
import { usePlotData } from "../context/PlotDataContext";
import NetworkLearning from "../models/NetworkLearning";

type TrainingControllerProps = {
    fun: (newValue: number) => void;
};

export default function TrainingController({ fun }: TrainingControllerProps) {
    const { network, updateBias, updateWeight, regenerateNetwork, updateActivationFunction } = useNetwork();
    const { plotData, generateData,dataGenerated } = usePlotData();

    const [isTraining, setIsTraining] = useState(false);
    const [accuracy, setAccuracy] = useState(0);
    const [cost, setCost] = useState(0);
    const [activation, setActivation] = useState("sigmoid");
    const [selectedCost, setSelectedCost] = useState("mse");
    const [selectedOptimizer, setSelectedOptimizer] = useState("sgd");
    const [learningRateIndex, setLearningRateIndex] = useState(3);
    const [epochIndex, setEpochIndex] = useState(2); 
    //const [pointIndex, setPointIndex] = useState(2);
    const [batchIndex, setBatchIndex] = useState(19);

    //
    const learningRates = [0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.001];
    const epochOptions = [100, 250, 500, 1000, 2500, 5000, 10000];
    // pointOptions = [100, 250, 500, 1000, 2500, 5000];
    const batchPercents = Array.from({ length: 20 }, (_, i) => (i + 1) * 5); 

    const updateMetrics = (newAccuracy: number, newCost: number) => {
        setAccuracy(newAccuracy);
        setCost(newCost);
    };


    const startTraining = async () => {
        if (!network) return;
        setIsTraining(true);
        
        await NetworkLearning(epochOptions[epochIndex], learningRates[learningRateIndex], batchPercents[batchIndex], plotData.points, activation,
            selectedCost, selectedOptimizer, network, updateMetrics);

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
        <div className="p-4 bg-gray-200 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-md min-w-[260px]">

            <h2 className="text-xl font-semibold text-gray-800">Training Controls</h2>

            {/* Metrics */}
            <div className="flex justify-between text-sm text-gray-700">
                <h3>Accuracy: {accuracy.toFixed(2)}%</h3>
                <h3>Cost: {cost.toFixed(4)}</h3>
            </div>

            {/* Generate & Train Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => { generateData(); generateData(); }}
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

            {/* regenarate network & seed */}
            
            <div className="gap-2 flex">
                {/*
                <label className="flex justify-between items-center text-sm text-gray-700">
                    <span className="font-bold">Seed:</span>
                    <input
                        type="text"
                        value={seed}
                        onChange={(e) => { setSeed(e.target.value) }}
                        className="w-36 px-2 py-1 border rounded-md shadow-sm  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </label>
                 */ }
                
                <button
                    onClick={regenerateNetwork}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isTraining
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                    disabled={isTraining}
                >
                    Regenerate Network
                </button>
                <button
                    onClick={() => fun(1)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isTraining
                        ? "bg-gray-400"
                        : "bg-red-500 hover:bg-red-600"
                        } text-white`}
                    disabled={isTraining}
                >
                    Change Generator
                </button>
               
            </div>

            {/* Learning Rate */}
            <label className="block text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="font-bold">Learning Rate:</span>
                    <span>{learningRates[learningRateIndex]}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={learningRates.length - 1}
                    step={1}
                    value={learningRateIndex}
                    onChange={(e) => setLearningRateIndex(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                />
            </label>

            {/* Epochs */}
            <label className="block text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="font-bold">Epochs:</span>
                    <span>{epochOptions[epochIndex]}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={epochOptions.length - 1}
                    step={1}
                    value={epochIndex}
                    onChange={(e) => setEpochIndex(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                />
            </label>

            {/* Number of Points 
            <label className="block text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="font-bold">Points:</span>
                    <span>{pointOptions[pointIndex]}</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={pointOptions.length - 1}
                    step={1}
                    value={pointIndex}
                    onChange={(e) => setPointIndex(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                />
            </label>*/}

            {/* Batch Size (Percent of dataset) */}
            <label className="block text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="font-bold">Batch Size (%):</span>
                    <span>{batchPercents[batchIndex]}%</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={batchPercents.length - 1}
                    step={1}
                    value={batchIndex}
                    onChange={(e) => setBatchIndex(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                />
            </label>

            {/* Dropout rate */}
            <label className="flex flex-col text-sm text-gray-700">
                <span className="mb-1">Optimizer:</span>
                <select
                    value={selectedOptimizer}
                    onChange={(e) => setSelectedOptimizer(e.target.value)}
                    className="px-2 py-1 border rounded-md shadow-sm"
                >
                    <option value="sgd">SGD</option>
                    <option value="momentum">Momentum</option>
                    <option value="adam">Adam</option>
                </select>
            </label>

            {/* Activation Function Selector */}
            <label className="flex flex-col text-sm text-gray-700">
                <span className="mb-1">Activation Function:</span>
                <select
                    value={activation}
                    onChange={(e) => { setActivation(e.target.value); updateActivationFunction(e.target.value) }}
                    className="px-2 py-1 border rounded-md shadow-sm"
                >
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                    <option value="relu">ReLU</option>
                    <option value="leakyrelu">Leaky ReLU</option>
                    <option value="elu">ELU</option>
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

          
        </div>
    );
}
