
interface SingleLayerliderInterface {
    layerIndex: number;
    biases: number[];
    weights: number[][];
    updateBias: (layerNumber: number, neuronNumber: number, newBias: number) => void;
    updateWeight: (layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) => void;
}

export default function SingleLayerlider({ layerIndex, biases, weights, updateBias, updateWeight }: SingleLayerliderInterface) {
    return (
        <div className="p-4 border-2 border-gray-400 rounded-lg bg-white shadow-md w-80">
            <h3 className="text-lg font-bold text-center">Layer {layerIndex}</h3>

            {/* Bias */}
            <h4 className="text-sm font-semibold mt-2">Biases:</h4>
            {biases.map((bias, neuronIndex) => (
                <div key={neuronIndex} className="flex items-center space-x-2">
                    <label className="text-xs">Neuron {neuronIndex}</label>
                    <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.01"
                        value={bias}
                        onChange={(e) => updateBias(layerIndex, neuronIndex, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                    />
                    <span className="text-xs">{bias.toFixed(2)}</span>
                </div>
            ))}

            {/* Weight */}
            {weights.length > 0 && (
                <>
                    <h4 className="text-sm font-semibold mt-2">Weights:</h4>
                    {weights.map((weightsRow, neuronIndex) => (
                        <div key={neuronIndex} className="mb-2">
                            <p className="text-xs">Neuron {neuronIndex} Weights:</p>
                            {weightsRow.map((weight, weightIndex) => (
                                <div key={`${layerIndex}_${neuronIndex}_${weightIndex}`} className="flex items-center space-x-2">
                                    <label className="text-xs">→ {weightIndex}</label>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        step="0.01"
                                        value={weight}
                                        onChange={(e) =>
                                            updateWeight(layerIndex, neuronIndex, weightIndex, parseFloat(e.target.value))
                                        }
                                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer 
             [&::-webkit-slider-thumb]:appearance-none 
             [&::-webkit-slider-thumb]:h-5 
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-gray-600 hover:[&::-webkit-slider-thumb]:bg-gray-800"
                                    />
                                    <span className="text-xs">{weight.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}