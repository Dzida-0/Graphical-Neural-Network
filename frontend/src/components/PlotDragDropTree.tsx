import { JSX } from "react/jsx-runtime";
import { usePlotData } from "./../context/PlotDataContext";
import TreeNode from "./../models/data/TreeNode";

export default function PlotDragDropTree() {
    const { classTreeData, addNode, removeNode } = usePlotData(); // Get addNode function

    // Handle dragging the spawner
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, nodeKey: string) => {
        event.dataTransfer.setData("nodeKey", nodeKey);
    };

    // Handle dropping on a tree node
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetKey: string) => {
        event.preventDefault();
        const draggedKey = event.dataTransfer.getData("nodeKey");

        if (draggedKey == "spawn") {
            addNode(targetKey); 
        }
        else if (draggedKey == "delete") {
            removeNode(targetKey); 
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
                        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center"
                        draggable={true}
                        key={`t-&=${node.key}`}
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
                <div className="relative w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, node.key)} // Enable dropping
                    key={`t-&=${node.key}`}
                >
                 
                </div>
                <div className="relative flex space-x-4 mt-2">
                    {Array.from(node.next.values()).map((nextNode: TreeNode) => (
                        <div className="relative flex flex-col items-center">
                     
                            {renderTree(nextNode)}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
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
            {
                renderTree(classTreeData.root)}
        </div>
    );
}
