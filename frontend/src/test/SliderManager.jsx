import { useContext } from "react";
import { NNData } from "./NNData";

export default function SliderManager() {
    const { network, updateNetwork } = useContext(NNData);

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">Adjust Network Parameters</h2>
            {Object.keys(network.biases).map((layer) => (
                <div key={layer} className="p-2 bg-white rounded-md">
                    <h3>{layer} Biases</h3>
                    {Object.entries(network.biases[layer]).map(([key, bias]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <label className="text-sm">{key}</label>
                            <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.01"
                                value={bias}
                                onChange={(e) => {
                                    const newBiases = { ...network.biases };
                                    newBiases[layer][key] = parseFloat(e.target.value);
                                    updateNetwork({ ...network, biases: newBiases });
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
