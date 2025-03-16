import { useState } from "react";
import { useNetwork } from "./../context/NetworkContext";
import { JSX } from "react/jsx-runtime";

export default function DragDropNN() {
    const { network, addNeuron, removeNeuron } = useNetwork();
    const [draggedNeuron, setDraggedNeuron] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [newNeuronDragging, setNewNeuronDragging] = useState(false);

    const handleDragStart = (layerIndex: number, neuronIndex: number) => {
        setDraggedNeuron(`${layerIndex}_${neuronIndex}`);
        setIsDragging(true);
    };

    const handleDrop = (layerIndex: number) => {
        if (!draggedNeuron) return;
        const [oldLayer, neuronIndex] = draggedNeuron.split("_").map(Number);

        addNeuron(layerIndex);
        if (!newNeuronDragging) removeNeuron(oldLayer, neuronIndex);

        setDraggedNeuron(null);
        setIsDragging(false);
        setNewNeuronDragging(false);
    };

    const handleRemove = () => {
        if (!draggedNeuron) return;
        const [oldLayer, neuronIndex] = draggedNeuron.split("_").map(Number);

        removeNeuron(oldLayer, neuronIndex);
        setDraggedNeuron(null);
        setIsDragging(false);
    };

    const handleCreate = (e: React.MouseEvent) => {
        e.preventDefault();
        setNewNeuronDragging(true);
        setDraggedNeuron("new_0"); 
        setIsDragging(true);
    };

    const drawConnections = () => {
        const lines: JSX.Element[] = [];
        network.layers.forEach((layer, layerIndex) => {
            if (layerIndex === network.layers.length - 1) return;

            layer.biases.forEach((_, neuronIndex) => {
                const startX = 150 + layerIndex * 200;
                const startY = 100 + neuronIndex * 80;
                const nextLayer = network.layers[layerIndex + 1];

                nextLayer.biases.forEach((_, nextNeuronIndex) => {
                    const endX = 150 + (layerIndex + 1) * 200;
                    const endY = 100 + nextNeuronIndex * 80;

                    lines.push(
                        <line
                            key={`line-${layerIndex}-${neuronIndex}-${nextNeuronIndex}`}
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke="black"
                            strokeWidth="3"
                        />
                    );
                });
            });
        });

        return lines;
    };

    return (
        <div className="relative flex flex-col bg-gray-100 w-full h-screen">
            {/* Controls */}
            <div className="flex items-center justify-center p-4 bg-gray-300">
                {/*  ➕ */}
                <button
                    className="w-12 h-12 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-pointer"
                    onClick={handleCreate}
                >
                    ➕
                </button>

                {/* ✖ */}
                {isDragging && (
                    <div
                        className="w-12 h-12 ml-4 rounded-full bg-red-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleRemove}
                    >
                        ✖
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="relative flex justify-center items-center w-full h-full">
                {/* Connections  */}
                <div className="absolute w-full h-full pointer-events-none">
                    <svg className="w-full h-full">{drawConnections()}</svg>
                </div>

                {/* Neuron  */}
                <div className="flex justify-center items-center space-x-8">
                    {network.layers.map((layer, layerIndex) => (
                        <div
                            key={layerIndex}
                            className="flex flex-col items-center bg-gray-300 p-4 border-2 border-black rounded-lg shadow-md w-[150px] min-h-[300px] justify-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(layerIndex)}
                        >
                            <h3 className="text-lg font-semibold">{`H${layerIndex}`}</h3>
                            <div className="flex flex-col items-center space-y-4 mt-4">
                                {Array.from({ length: layer.neuronsNumber }).map((_, neuronIndex) => (
                                    <div
                                        key={`${layerIndex}-${neuronIndex}`}
                                        className="w-12 h-12 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grab"
                                        draggable
                                        onDragStart={() => handleDragStart(layerIndex, neuronIndex)}
                                    >
                                        {layer.biases?.[neuronIndex] ?? ""}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*  new neuron */}
            {newNeuronDragging && (
                <div
                    className="absolute top-24 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grabbing"
                    draggable
                    onDragStart={() => setDraggedNeuron("new_0")}
                >
                    +
                </div>
            )}
        </div>
    );
}
