import { useNetwork } from "../context/NetworkContext";

export default function SlidersNN() {
    const { network, updateBias, updateWeight } = useNetwork();

    const handleBiasChange = (layerNumber: number, neuronNumber: number, newBias: number) => {
        updateBias(layerNumber,neuronNumber,newBias);
    }

    const handleWeightChange = (layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) => {
        console.log(layerNumber, neuronNumber, inputNumber, newWeight);
        updateWeight(layerNumber,neuronNumber,inputNumber,newWeight);
    }

    return (
        <div>
            <div className="p-4 space-y-4">
                {network.layers.map((layer, layerIndex) => (
                    <div key={layerIndex} className="p-4 border-2 border-gray-400 rounded-lg">
                        <h3 className="text-lg font-bold">Layer {layerIndex}</h3>

                        {/* Bias */}
                        <h4 className="text-sm font-semibold mt-2">Biases:</h4>
                        {layer.biases.map((bias, neuronIndex) => (
                            <div key={neuronIndex} className="flex items-center space-x-2">
                                <label className="text-xs">Neuron {neuronIndex}</label>
                                <input
                                    type="range"
                                    min="-1"
                                    max="1"
                                    step="0.01"
                                    value={bias}
                                    onChange={(e) => handleBiasChange(layerIndex, neuronIndex, parseFloat(e.target.value))}
                                    className="w-40"
                                />
                                <span className="text-xs">{bias.toFixed(2)}</span>
                            </div>
                        ))}

                        {/* Weight */}
                        {layerIndex < network.layers.length && (
                            <>
                                <h4 className="text-sm font-semibold mt-2">Weights:</h4>
                                {layer.weights.map((weights, neuronIndex) => (
                                    <div key={neuronIndex} className="mb-2">
                                        <p className="text-xs">Neuron {neuronIndex} Weights:</p>
                                        {weights.map((weight, weightIndex) => (
                                            <div key={`${layerIndex}_${neuronIndex}_${weightIndex}`} className="flex items-center space-x-2">
                                                <label className="text-xs">→ {weightIndex}</label>
                                                <input
                                                    key={`${layerIndex}_${neuronIndex}_${weightIndex}`}
                                                    type="range"
                                                    min="-1"
                                                    max="1"
                                                    step="0.01"
                                                    value={weight}
                                                    onChange={(e) =>
                                                        handleWeightChange(layerIndex, neuronIndex, weightIndex, parseFloat(e.target.value))
                                                    }
                                                    className="w-40"
                                                />
                                                <span className="text-xs">{weight.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}