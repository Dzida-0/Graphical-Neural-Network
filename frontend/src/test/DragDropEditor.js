import React, { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { NNData } from "./NNData";
import "./dndStyle.css";

const ITEM_TYPE = "NEURON";

export default function DragDropEditor() {
    const { network, updateNetwork, addHiddenLayer } = useContext(NNData);

    const moveNeuron = (fromLayer, toLayer) => {
        if (toLayer === "in" || toLayer === "out") return;
        if (network.layers[toLayer] >= 10) return;

        const updatedLayers = { ...network.layers };
        updatedLayers[toLayer] += 1;
        updatedLayers[fromLayer] -= 1;

        if (updatedLayers[fromLayer] === 0) delete updatedLayers[fromLayer];

        updateNetwork({ ...network, layers: updatedLayers });
    };

    return (
        <div className="container">
            <h2 className="title">Neural Network Editor</h2>

            <button onClick={addHiddenLayer} className="add-layer-button">
                Add Hidden Layer
            </button>

            <div className="network-container">
                {Object.keys(network.layers).map((layer) => (
                    <NeuronContainer
                        key={layer}
                        layer={layer}
                        neurons={network.layers[layer]}
                        isEditable={layer.startsWith("h")}
                        moveNeuron={moveNeuron}
                    />
                ))}
            </div>
        </div>
    );
}

function NeuronContainer({ layer, neurons, isEditable, moveNeuron }) {
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item) => moveNeuron(item.fromLayer, layer),
    });

    return (
        <div ref={drop} className="layer-container">
            <h3 className="layer-title">{layer.toUpperCase()}</h3>
            <div className="neurons-container">
                {[...Array(neurons)].map((_, i) => (
                    <Neuron key={i} layer={layer} isEditable={isEditable} />
                ))}
            </div>
        </div>
    );
}

function Neuron({ layer, isEditable }) {
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { fromLayer: layer },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={isEditable ? drag : null}
            className={`neuron ${isDragging ? "dragging" : ""} ${isEditable ? "draggable" : ""}`}
        ></div>
    );
}
