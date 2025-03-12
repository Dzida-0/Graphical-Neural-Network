import React, { useContext, useEffect, useRef, useState } from "react";
import { NNData } from "./NNData";
import "./eee.css";

export function DragDropNN() {
    const { network, updateNetwork, removeNeuron, addNeuron } = useContext(NNData);
    const maxNeurons = Math.max(...Object.values(network.layers).map(l => l.length));
    const neuronRefs = useRef({});
    const [neurons, setNeurons] = useState(network.layers);
    const [draggedNeuron, setDraggedNeuron] = useState(null);

    useEffect(() => {
        if (JSON.stringify(network.layers) !== JSON.stringify(neurons)) {
            updateNetwork((prevNetwork) => ({
                ...prevNetwork,
                layers: { ...neurons }
            }));
        }
    }, [neurons]); 

    useEffect(() => {
        setNeurons(network.layers);
    }, [network.layers]); 


    function drawLines() {
        let connections = [];
        const layerNames = Object.keys(neurons);

        for (let i = 0; i < layerNames.length - 1; i++) {
            const fromLayer = layerNames[i];
            const toLayer = layerNames[i + 1];

            neurons[fromLayer].forEach((fromNeuron) => {
                neurons[toLayer].forEach((toNeuron) => {
                    let fromEl = neuronRefs.current[fromNeuron];
                    let toEl = neuronRefs.current[toNeuron];

                    if (fromEl && toEl) {
                        const fromRect = fromEl.getBoundingClientRect();
                        const toRect = toEl.getBoundingClientRect();

                        const x1 = fromRect.left + fromRect.width / 2;
                        const y1 = fromRect.top + fromRect.height / 2;
                        const x2 = toRect.left + toRect.width / 2;
                        const y2 = toRect.top + toRect.height / 2;

                        connections.push(
                            <line
                                key={`${fromNeuron}-${toNeuron}`}
                                x1={x1 }
                                y1={y1 }
                                x2={x2 }
                                y2={y2 }
                                stroke="black"
                                strokeWidth="2"
                            />
                        );
                    }
                });
            });
        }

        return connections;
    }

    function handleDragStart(neuron) {
        setDraggedNeuron(neuron);
    }

    function handleDrop(layer) {
        if (!draggedNeuron) return;
        if (!layer.startsWith("h")) return;

        removeNeuron(draggedNeuron);
        addNeuron(layer);
        setDraggedNeuron(null);
    }

    function handleDelete() {
        if (!draggedNeuron) return;
        removeNeuron(draggedNeuron);
        setDraggedNeuron(null);
    }

    function spawnNeuron() {
        addNeuron("h1"); 
    }






    return (
        <div className="nn-drag-drop-box">
            {/* Spawn & Delete Areas */}
            <div className="top-controls">
                <button className="spawn-btn" onClick={spawnNeuron}>Spawn Neuron</button>
                <div
                    className="delete-area"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDelete}
                >
                    Drag here to delete
                </div>
            </div>

            <div className="nn-drag-drop-cont">
                {/* Layers */}
                <div className="nn-drag-drop-layers-cont">
                    {Object.entries(neurons).map(([layer]) => (
                        <div key={layer} className="layer" style={{ height: `${maxNeurons * 100}px` }}></div>
                    ))}
                </div>

                {/* Lines */}
                <div className="nn-drag-drop-lines-cont">
                    <svg className="connections">{drawLines()}</svg>
                </div>

                {/* Nodes */}
                <div className="nn-drag-drop-nodes-cont">
                    {Object.entries(neurons).map(([layer, layerNeurons]) => (
                        <div
                            key={layer}
                            className="layer"
                            style={{ height: `${maxNeurons * 100}px`, background: "transparent" }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(layer)}
                        >
                            <h3>{layer.toUpperCase()}</h3>
                            <div className="neurons">
                                {layerNeurons.map((neuron) => (
                                    <div
                                        key={neuron}
                                        className="neuron"
                                        data-id={neuron}
                                        ref={(el) => (neuronRefs.current[neuron] = el)}
                                        draggable
                                        onDragStart={() => handleDragStart(neuron)}
                                    >
                                        {network.biases[layer]?.[`${layer}_${layerNeurons.indexOf(neuron) + 1}`] ?? ""}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
