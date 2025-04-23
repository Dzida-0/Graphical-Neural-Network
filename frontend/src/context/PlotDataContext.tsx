import React, { createContext, useState, useContext, useEffect } from "react";
import PlotData from "./../models/data/PlotData";
import Tree from "../models/data/Tree";
//import TreeNode from "../models/data/TreeNode";
import { updatePlot, getPlot } from "./../api/PlotDataAPI";
import DataDivider from "../models/data/DataDivider";
import MiddleTreeNode from "../models/data/MiddleTreeNode";
import EndTreeNode from "../models/data/EndTreeNode";
import TreeNode from "../models/data/TreeNode";
import LinearDivider from "../models/data/LinearDivider";
import SquaredDivider from "../models/data/SqueredDivider";
import CubedDivider from "../models/data/CubedDivider";
import SinDivider from "../models/data/SinDivider";
import VerdicalDivider from "../models/data/VerdicalDivider";


interface PlotDataContextInterface {
    plotData: PlotData;
    generateData: () => void;
    classTreeData: Tree;
   // getNodeByKey: (key: string) => TreeNode;
    addNode: (key: string) => void;
    removeNode: (key: string) => void;
    changeDivider: (key: string, divider: DataDivider) => void;
    getDivider: (key: string) => DataDivider;
  //  moveNode: (from: string, to: string) => void;
    dataGenerated: boolean;
    classesColors: Map<string, string>;
    seed: number;
    setSeed: (seed: string) => void;
}

const PlotDataContext = createContext<PlotDataContextInterface | undefined>(undefined);

export const PlotDataProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [plotData, setPlotData] = useState(new PlotData());
    const [classTreeData, setClassTreeData] = useState(new Tree());
    const [dataGenerated, setDataGenerated] = useState<boolean>(false);
    const classesColors = new Map<string, string>([
        ["A", "blue"],  // blue
        ["B", "green"],  // green
        ["C", "red"],  // red
        ["D", "yellow"],  // yellow
        ["E", "purple"],  // purple
    ]);
    const [seed, setNewSeed] = useState<number>(1);

    useEffect(() => {
        fetchPlot();
    }, [pageId]);

    const fetchPlot = async () => {
        const fetched = await getPlot(pageId);
        if (fetched) {
            console.log(fetched);
           
            const loadedTree = new Tree();
            function parseTreeNode(json: any): TreeNode {
                if (json.type === "endtreenode") {
                    return new EndTreeNode(json.value, json.key);
                } else if (json.type === "middletreenode") {
                    const node = new MiddleTreeNode(json.key);
                    for (const childKey in json.next) {
                        
                        if (json.next.hasOwnProperty(childKey)) {
                            const childNode = parseTreeNode(json.next[childKey]);
                            (node as MiddleTreeNode).setChild(childNode);
                        }
                    }
                    
                    return node;
                }
                throw new Error("Unknown node type: " + json.type);
            }
            loadedTree.root = parseTreeNode(fetched.tree.root);
            
            //Object.assign(loadedTree, fetched.tree);

            setClassTreeData(loadedTree);
            if (dataGenerated) {
                const loadedPlot = new PlotData(fetched.elementCount, fetched.tree.endNodeCount, fetched.points);
                setPlotData(loadedPlot);
            }
        }
    };
    

    const setSeed = (newSeed: string) => {
        setNewSeed((prevSeed) => {
            const parsed = Number(newSeed);

            if (!newSeed.startsWith("0") &&
                !isNaN(parsed) &&
                Number.isInteger(parsed) &&
                parsed > 0 &&
                parsed < 1e13
            ) {
                console.log(parsed);
                return parsed;
            }
            updatePlot("Seed", pageId, { seed: newSeed })
            return prevSeed;
        })
            
        
    };

    const generateData = async () => {
     
        try {
            
            updatePlot("Gen", pageId, {});
            fetchPlot();
            setDataGenerated(true);
            
        } catch (error) {
            console.error("Error in generateData:", error);
        }
    };


    const addNode = (key: string) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.addNode(key);
            updatePlot("AddN", pageId, { key: key })
            return newClassTreeData;
        });
        setDataGenerated(false);
    }

    const removeNode = (key: string) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.removeNode(key);
            updatePlot("RemN", pageId, { key: key })
            return newClassTreeData;
        });
        setDataGenerated(false);
    }

    const changeDivider = (key: string, divider: DataDivider) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.changeDivider(key, divider);
            if (divider instanceof LinearDivider) {
                updatePlot("ChDiv", pageId, { key: key, divider: "linear", deg: divider.deg, shiftX: divider.shiftX, shiftY: divider.shiftY })
            } else if (divider instanceof SquaredDivider) {
                updatePlot("ChDiv", pageId, { key: key, divider: "squered", deg: divider.deg, shiftX: divider.shiftX, shiftY: divider.shiftY, width: divider.width })
            } else if (divider instanceof CubedDivider) {
                updatePlot("ChDiv", pageId, { key: key, divider: "cubed", deg: divider.deg, shiftX: divider.shiftX, shiftY: divider.shiftY, width: divider.width })
            } else if (divider instanceof SinDivider) {
                updatePlot("ChDiv", pageId, { key: key, divider: "sin", deg: divider.deg, shiftX: divider.shiftX, shiftY: divider.shiftY, amplitude: divider.amplitude, wavelength: divider.wavelength })
            } else if (divider instanceof VerdicalDivider) {
                updatePlot("ChDiv", pageId, { key: key, divider: "vierdical", deg: divider.deg, shiftX: divider.shiftX, shiftY: divider.shiftY, frequency: divider.frequency })
            }
            return newClassTreeData;
        });
        setDataGenerated(false);
    }

    const getDivider = (key: string) => {
        return classTreeData.getDivider(key);
    }

    return (
        <PlotDataContext.Provider value={{ plotData, generateData, classTreeData, addNode, removeNode, changeDivider, getDivider, dataGenerated, classesColors, seed, setSeed }}>
            {children}
        </PlotDataContext.Provider>
    );
}

export const usePlotData = () => {
    const context = useContext(PlotDataContext);
    if (!context) {
        throw new Error("usePlotData must be used within a PlotDataProvider");
    }
    return context;
};