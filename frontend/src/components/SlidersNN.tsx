import { useNetwork } from "../context/NetworkContext";
import SingleLayerSlider from "./SingleLayerSlider";

export default function SlidersNN() {
    const { network, updateBias, updateWeight } = useNetwork();

    return (
        <div className="p-4 flex gap-4 w-full overflow-x-auto justify-center px-10">
            {network.layers.map((layer, layerIndex) => (
                <SingleLayerSlider
                    layerIndex={layerIndex}
                    biases={layer.biases}
                    weights={layer.weights}
                    updateBias={updateBias}
                    updateWeight={updateWeight}
                />
             ))}
        </div>
    );
}
