import { useState } from "react";
import { JSX } from "react/jsx-runtime";
import Tree from "./../models/data/Tree"

export default function PlotDragDropTree() {
    const [tree] = useState({
        n0: {
            n0: { e0: "A", e1: "B" },
            e1: "C",
        },
    });

    const renderTree = (node: any, key: string, isRoot = false): JSX.Element => {
        if (typeof node === "string") {
            return (
                <div key={key} className="relative flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                        {key + ": " + node}
                    </div>
                </div>
            );
        }

        const children = Object.entries(node);

        return (
            <div key={key} className="relative flex flex-col items-center">
                {!isRoot && (
                    <div className="relative w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        {key + ": " + Object.keys(node).join(", ")}
                        {children.length > 0 && (
                            <div className="absolute bottom-[-10px] left-1/2 w-0.5 h-4 bg-gray-600"></div>
                        )}
                    </div>
                )}
                {children.length > 0 && (
                    <div className="relative flex space-x-4 mt-2">
                        {children.map(([childKey, childValue]) => (
                            <div key={childKey} className="relative flex flex-col items-center">
                                <div className="absolute top-[-10px] left-1/2 w-0.5 h-4 bg-gray-600"></div>
                                {renderTree(childValue, childKey)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center space-y-6">
            <h2 className="text-lg font-bold mb-4">Tree Structure</h2>
            {renderTree(tree, "n0", true)}
        </div>
    );
}
