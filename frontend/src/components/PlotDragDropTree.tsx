import { JSX } from "react/jsx-runtime";
import { usePlotData } from "./../context/PlotDataContext";
import TreeNode from "./../models/data/TreeNode";
import { useState, useEffect, useRef } from "react";

export default function PlotDragDropTree() {
    const { classTreeData, addNode, removeNode } = usePlotData(); // Get addNode function
    const [sideWindowShow, setSideWindowShow] = useState<number>(0);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const [treeRenderTrigger, setTreeRenderTrigger] = useState<number>(0);
    const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});
    const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            updateNodePositions();
        });

        Object.values(nodeRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [classTreeData]);

    useEffect(() => {
        const handleClickOutside = () => {



            setSelectedNodeKey(null);
            setSideWindowShow(0);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        nodeRefs.current = {};
        const timeout = setTimeout(() => {
            updateNodePositions();
        }, 0);

        return () => clearTimeout(timeout);
    }, [treeRenderTrigger]);



    const drawConnections = () => {
        
        const lines: JSX.Element[] = [];

        const addConnection = (startKey: string, endKey: string, startX: number, startY: number, endX: number, endY: number) => {
            const line = (
                <line
                    key={`${startKey}-${endKey}`}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}  
                    stroke="black"
                    strokeWidth={2}
                />
            );
            lines.push(line);
        };

        const drawNode = (node: TreeNode) => {
            const startPos = nodePositions[node.key];
            if (!startPos) return; 
            const { x: startX, y: startY } = nodePositions[node.key];
            node.next.forEach((bellowNode) => {

                const endPos = nodePositions[bellowNode.key];
                if (!endPos) return; 
                const { x: endX, y: endY } = nodePositions[bellowNode.key];
                addConnection(node.key, bellowNode.key, startX, startY, endX, endY);
                if (bellowNode.next.size > 0) drawNode(bellowNode);
            });
        }

        drawNode(classTreeData.root);

        return lines; 
    };

    const handleMiddleNodeClick = (targetKey: string) => {
        console.log(targetKey);
        setSelectedNodeKey(targetKey);
        setSideWindowShow(1);
    };

    const handleEndNodeClick = (targetKey: string) => {
        console.log(targetKey);
        setSelectedNodeKey(targetKey);
        setSideWindowShow(2);
    };

    const updateNodePositions = () => {
        requestAnimationFrame(() => {
            const positions: { [key: string]: { x: number; y: number } } = {};
            Object.entries(nodeRefs.current).forEach(([key, ref]) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    positions[key] = {
                        x: rect.left + rect.width / 2 + window.scrollX - 840,
                        y: rect.top + rect.height / 2 + window.scrollY - 2400
                    };
                }
            });
            setNodePositions(positions);
        });
    };

    

    // Handle dragging the spawner
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, nodeKey: string) => {
        event.dataTransfer.setData("nodeKey", nodeKey);
    };

    // Handle dropping on a tree node
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetKey: string) => {
        event.preventDefault();
        const draggedKey = event.dataTransfer.getData("nodeKey");

        if (draggedKey == "spawn") {
            nodeRefs.current = {};
            addNode(targetKey); 
            setTreeRenderTrigger(prev => prev + 1);
        }
        else if (draggedKey == "delete") {
            nodeRefs.current = {};
            removeNode(targetKey); 
            setTreeRenderTrigger(prev => prev + 1);
        }
    };

    // Prevent default drag-over behavior to allow dropping
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const renderTree = (node: TreeNode): JSX.Element => {
        
       
        if (node.value != null) {
           
            return (
                
                <div
                    //key={node.key}
                    className="relative flex flex-col items-center"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, node.key)} // Enable dropping
                >
                    <div
                        className={`w-12 h-12 text-white rounded-full flex items-center justify-center 
                        ${selectedNodeKey === node.key ? "bg-green-700" : "bg-green-500"}`}
                        draggable={true}
                        key={`t-&=${node.key}`}
                        onClick={() => handleEndNodeClick(node.key)}
                        ref={(el) => {
                            nodeRefs.current[node.key] = el;
                        }}
                    >
                        {node.value}
                    </div>
                </div>
            );
        }

        return (
            <div
                //key={`t-&=${node.key}`}
                
                className="relative flex flex-col gap-10 items-center"
                
            >
                <div className={`relative w-12 h-12 text-white rounded-full flex items-center justify-center 
                ${selectedNodeKey === node.key ? "bg-blue-700" : "bg-blue-500"}`}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, node.key)} // Enable dropping
                    key={`t-&=${node.key}`}
                    onClick={() => handleMiddleNodeClick(node.key)}
                    ref={(el) => {
                        nodeRefs.current[node.key] = el;
                    }}
                >
                 
                </div>
                <div className="relative flex space-x-4 mt-2">
                    {Array.from(node.next.values()).map((nextNode: TreeNode) => (
                        <div className="relative flex flex-col items-center" key={`r-&=${nextNode.key}`}>
                            {renderTree(nextNode)}
                          
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center space-y-6">
                <h2 className="text-lg font-bold mb-4">Tree Structure</h2>
                <div>
                    Spawner
                    <div
                        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                        draggable={true}
                        onDragStart={(event) => handleDragStart(event, "spawn")} // Start drag with "spawner"
                    />
                </div>
                <div>
                    Delete
                    <div
                        className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                        draggable={true}
                        onDragStart={(event) => handleDragStart(event, "delete")} // Start drag with "spawner"
                    />
                </div>
            
                <div className="relative">
                    
                    {/* Conections */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {drawConnections()}
                    </svg>
                    {/* Nodes */}
                    <div className="relative">
                        {renderTree(classTreeData.root)}
                    </div>
                    
                   
                    </div>
            
            </div>
            {/* Side window */}
            <div>
                {{
                    0: () => renderTree(classTreeData.root),
                    1: () => renderTree(classTreeData.root),
                    2: () => renderTree(classTreeData.root),
                }[sideWindowShow as 0 | 1 | 2]?.()}
            </div>

        </div>
    );
}
