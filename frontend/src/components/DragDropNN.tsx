import { useState, useRef, useEffect } from "react";
import { useNetwork } from "./../context/NetworkContext";
import { JSX } from "react/jsx-runtime";

export default function DragDropNN() {
    const { network, addNeuron, removeNeuron,addLayer } = useNetwork();
    const [draggedNeuron, setDraggedNeuron] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [newNeuronDragging, setNewNeuronDragging] = useState(false);
    const [maxNeurons, setMaxNeurons] = useState(Math.max(...network.layers.map(layer => layer.neuronsNumber), 1));
    const [neuronPositions, setNeuronPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
    const neuronRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [hoveredNeuron, setHoveredNeuron] = useState<string | null>(null);

    const handleDragStart = (layerIndex: number, neuronIndex: number) => {
        if (layerIndex == network.hidenLayerCount) return;
        setDraggedNeuron(`${layerIndex}_${neuronIndex}`);
        setIsDragging(true);
    };

    const handleNewLayer = (index: number) => {
        addLayer(index);
        setMaxNeurons(Math.max(...network.layers.map(layer => layer.neuronsNumber), 1));
        setDraggedNeuron(null);
        setIsDragging(false);
        setNewNeuronDragging(false);
    }

    const handleDrop = (layerIndex: number) => {
        if (!draggedNeuron) return;
        const [oldLayer, neuronIndex] = draggedNeuron.split("_").map(Number);

        addNeuron(layerIndex);
        if (!newNeuronDragging) removeNeuron(oldLayer, neuronIndex);
        setMaxNeurons(Math.max(...network.layers.map(layer => layer.neuronsNumber), 1));
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

    const updateNeuronPositions = () => {
        const positions: { [key: string]: { x: number; y: number } } = {};
        Object.entries(neuronRefs.current).forEach(([key, ref]) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                positions[key] = { x: rect.x - rect.width/ 2, y: rect.y -210 }; // Center of neuron
            }
        });
        setNeuronPositions(positions);
    };

    useEffect(() => {
        updateNeuronPositions();
        window.addEventListener("resize", updateNeuronPositions);
        return () => window.removeEventListener("resize", updateNeuronPositions);
    }, [network]); // Re-run when the network changes or window is resized

    const [animatedLines, setAnimatedLines] = useState(new Set());

    const drawConnections = () => {
        const grayLines: JSX.Element[] = [];
        const blackLines: JSX.Element[] = [];

        const getLineProps = (startKey: string, endKey: string) => {
            if (!hoveredNeuron || startKey === hoveredNeuron || endKey === hoveredNeuron) {
                return { stroke: "black", strokeWidth: "3.5", animated: false }; // Black lines stay solid
            }
            return { stroke: "gray", strokeWidth: "1.0", animated: true }; // Gray lines animate
        };

        const addConnection = (startKey: string, endKey: string, startX: number, startY: number, endX: number, endY: number) => {
            const { stroke, strokeWidth, animated } = getLineProps(startKey, endKey);
            const lineLength = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2); // Calculate line length
            const isAnimating = animated && !animatedLines.has(`${startKey}-${endKey}`);

            const line = (
                <line
                    key={`${startKey}-${endKey}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={animated ? lineLength : "0"}
                    strokeDashoffset={isAnimating ? lineLength : "0"}
                    style={{
                        transition: isAnimating ? "stroke-dashoffset 1.6s linear" : "none",
                    }}
                />
            );

            if (stroke === "black") {
                blackLines.push(line); // Black lines on top
            } else {
                grayLines.push(line);
            }

            // Trigger animation after render
            if (isAnimating) {
                setTimeout(() => {
                    setAnimatedLines((prev) => new Set(prev).add(`${startKey}-${endKey}`));
                }, 10);
            }
        };

        // Input layer connections
        Array.from({ length: network.inputsNumber }).forEach((_, neuronIndex) => {
            const startKey = `-1-${neuronIndex}`;
            if (!neuronPositions[startKey]) return;

            const { x: startX, y: startY } = neuronPositions[startKey];

            if (0 < network.layers.length - 1) {
                const nextLayer = network.layers[0];
                nextLayer.biases.forEach((_, nextNeuronIndex) => {
                    const endKey = `0-${nextNeuronIndex}`;
                    if (!neuronPositions[endKey]) return;

                    const { x: endX, y: endY } = neuronPositions[endKey];
                    addConnection(startKey, endKey, startX, startY, endX, endY);
                });
            }
        });

        // Hidden & Output layer connections
        network.layers.forEach((layer, layerIndex) => {
            layer.biases.forEach((_, neuronIndex) => {
                const startKey = `${layerIndex}-${neuronIndex}`;
                if (!neuronPositions[startKey]) return;

                const { x: startX, y: startY } = neuronPositions[startKey];

                if (layerIndex < network.layers.length - 1) {
                    const nextLayer = network.layers[layerIndex + 1];
                    nextLayer.biases.forEach((_, nextNeuronIndex) => {
                        const endKey = `${layerIndex + 1}-${nextNeuronIndex}`;
                        if (!neuronPositions[endKey]) return;

                        const { x: endX, y: endY } = neuronPositions[endKey];
                        addConnection(startKey, endKey, startX, startY, endX, endY);
                    });
                }
            });
        });

        return [...grayLines, ...blackLines]; // Gray lines first, black lines on top
    };

    useEffect(() => {
        setAnimatedLines(new Set()); // Reset animation on hover changes
    }, [hoveredNeuron]);



    return (
        <div className="relative flex flex-col bg-gray-100 w-full " style={{
            minHeight: `${Math.max(500, maxNeurons * 40) + 150}px`
        }}>
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
            <div className="relative flex justify-center items-center w-full h-full py-10"
                style={{
                    minHeight: `${Math.max(500, maxNeurons * 40) + 100}px`
                }}>

                {/* Layers  */}
                <div className="absolute flex justify-around  items-center space-x-8"
                    style={{
                        minWidth: `${(network.hidenLayerCount + 2) * 300}px`
                    }}
                >
                    {/* IN layer */}
                    <div
                        className={`flex flex-col items-center bg-gray-300 p-4 border-2 border-black rounded-lg shadow-md w-[150px]`}
                       
                    >
                        <h3 className="text-lg font-semibold">
                            IN
                        </h3>
                        <div className="flex flex-col items-center justify-center justify-evenly mt-4"
                            style={{
                                minHeight: `${Math.max(500, maxNeurons * 40)}px`
                            }}
                        >
                            {Array.from({ length: network.inputsNumber }).map((_, neuronIndex) => (
                                <div
                                    key={`IN-${neuronIndex}`}
                                    
                                    className="w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grab"
                                    draggable={false}
                                >
                                    {""}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4 w-[50px]"
                        style={{
                            minHeight: `${Math.max(500, maxNeurons * 40)}px`
                        }}
                    ></div>
                    {/* hiden layers */}
                    {network.layers.map((layer, layerIndex) => (
                        <>
                        <div
                            key={layerIndex}
                            className={`flex flex-col items-center bg-gray-300 p-4 border-2 border-black rounded-lg shadow-md w-[150px]`}
                            style={{
                                minHeight: `${Math.max(500, maxNeurons * 40)}px`
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(layerIndex)}
                        >
                            <h3 className="text-lg font-semibold">
                                {network.hidenLayerCount > layerIndex ? `H${layerIndex + 1}` : "OUT"}
                            </h3>
                            <div className="flex flex-col items-center justify-center justify-evenly mt-4"
                                style={{
                                    minHeight: `${Math.max(500, maxNeurons * 40)}px`
                                }}
                            >
                                {Array.from({ length: layer.neuronsNumber }).map((_, neuronIndex) => (
                                    <div
                                        key={`${layerIndex}-${neuronIndex}`}
                                        
                                        className="w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grab "
                                        draggable={layerIndex != network.hidenLayerCount}

                                        onDragStart={() => handleDragStart(layerIndex, neuronIndex)}
                                    >
                                        {layer.biases?.[neuronIndex] ?? ""}
                                    </div>
                                ))}
                            </div>
                        </div>
                            <div className="flex flex-col items-center p-4  w-[50px]"
                                style={{
                                    minHeight: `${Math.max(500, maxNeurons * 40)}px`
                                }}
                            ></div>
                        </>
                    ))}
                    {/* OUT Layer */}
                </div>

                {/* Connections  */}
                <div className="absolute w-full h-full pointer-events-none">
                    <svg className="w-full h-full">{drawConnections()}</svg>
                </div>

                {/* Neuron  */}
                <div className="absolute flex justify-around  items-center space-x-8"
                    style={{
                        minWidth: `${(network.hidenLayerCount + 2) * 300}px`
                    } }
                >
                    {/* IN layer */}
                    <div
                        className={` flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md w-[150px] `}
                        style={{
                            minHeight: `${Math.max(500, maxNeurons * 40)}px`
                        }}
                    >
                        <h3 className="text-lg font-semibold invisible">
                            IN
                        </h3>
                        <div className="flex flex-col items-center justify-center justify-evenly mt-4"
                            style={{
                                minHeight: `${Math.max(500, maxNeurons * 40)}px`
                            }}
                        >
                            {Array.from({ length: network.inputsNumber }).map((_, neuronIndex) => (
                                <div
                                    key={`IN-${neuronIndex}`}
                                    ref={(el) => {
                                        neuronRefs.current[`-1-${neuronIndex}`] = el;
                                    }}
                                    className={`w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grab 
        transition-transform duration-200 ${hoveredNeuron === `-1-${neuronIndex}` ? "scale-110" : ""}`}

                                    draggable={false}
                                    onMouseEnter={() => setHoveredNeuron(`-1-${neuronIndex}`)}
                                    onMouseLeave={() => setHoveredNeuron(null)}
                                >
                                    {""}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center p-4  w-[50px]"
                        style={{
                            minHeight: `${Math.max(500, maxNeurons * 40)}px`
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleNewLayer(0)}
                    ></div>
                    {/* oder layers */}
                    {network.layers.map((layer, layerIndex) => (
                        <>
                        <div
                            key={layerIndex}
                            className={`flex flex-col items-center p-4 border-2 border-black rounded-lg shadow-md w-[150px] `}
                            style={{
                                minHeight: `${Math.max(500, maxNeurons * 40)}px`
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(layerIndex)}
                        >
                            <h3 className="text-lg font-semibold invisible">
                                {network.hidenLayerCount > layerIndex ? `H${layerIndex + 1}` : "OUT"}
                            </h3>
                            <div className="flex flex-col items-center justify-center justify-evenly mt-4"
                                style={{
                                    minHeight: `${Math.max(500, maxNeurons * 40)}px`
                                }}
                            >
                                {Array.from({ length: layer.neuronsNumber }).map((_, neuronIndex) => (
                                    <div
                                        key={`${layerIndex}-${neuronIndex}`}
                                        ref={(el) => {
                                            neuronRefs.current[`${layerIndex}-${neuronIndex}`] = el;
                                        }}
                                        className={`w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grab 
        transition-transform duration-200 ${hoveredNeuron === `${layerIndex}-${neuronIndex}` ? "scale-110" : ""}`}

                                        draggable={layerIndex != network.hidenLayerCount}

                                        onDragStart={() => handleDragStart(layerIndex, neuronIndex)}
                                        onMouseEnter={() => setHoveredNeuron(`${layerIndex}-${neuronIndex}`)}
                                        onMouseLeave={() => setHoveredNeuron(null)}
                                    >
                                        {layer.biases?.[neuronIndex] ?? ""}
                                    </div>
                                ))}
                            </div>
                            </div>
                            <div className="flex flex-col items-center p-4  w-[50px]"
                                style={{
                                    minHeight: `${Math.max(500, maxNeurons * 40)}px`
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleNewLayer(layerIndex + 1)}
                            ></div>
                            </>
                    ))}
                </div>
                
            </div>

            {/*  new neuron */}
            {newNeuronDragging && (
                <div
                    className="absolute top-24 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white flex items-center justify-center font-bold cursor-grabbing"
                    draggable
                    onDragStart={() => setDraggedNeuron("new_0")}
                >
                    +
                </div>
            )}
        </div>
    );
}
