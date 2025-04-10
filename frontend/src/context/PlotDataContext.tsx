import React, { createContext, useState, useContext } from "react";
import PlotData from "./../models/data/PlotData";
import Tree from "../models/data/Tree";
//import TreeNode from "../models/data/TreeNode";
import { PlotAPI } from "./../api/PlotDataAPI";
import DataDivider from "../models/data/DataDivider";


interface PlotDataContextInterface {
    plotData: PlotData;
    generateData: () => void;
    classTreeData: Tree;
   // getNodeByKey: (key: string) => TreeNode;
    addNode: (key: string) => void;
    removeNode: (key: string) => void;
    changeDivider: (key: string, divider: DataDivider) => void;
  //  moveNode: (from: string, to: string) => void;
    dataGenerated: boolean;
    classesColors: Map<string, string>;
}

const PlotDataContext = createContext<PlotDataContextInterface | undefined>(undefined);

export const PlotDataProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [plotData, setPlotData] = useState(new PlotData());
    const [classTreeData, setClassTreeData] = useState(new Tree());
    const [dataGenerated, setDataGenerated] = useState(false);
    const classesColors = new Map<string, string>([
        ["A", "blue"],
        ["B", "green"],
        ["C", "red"],
        ["D", "yellow"],
        ["E", "purple"]
        ]);
    const generateData = async () => {
     
        try {
            
            const newData = await PlotAPI("generate", pageId, "POST");
            

            if (newData) {
                setPlotData(new PlotData(newData.pointsCount, newData.classCount, newData.points));
                setDataGenerated(true);
            }
        } catch (error) {
            console.error("Error in generateData:", error);
        }
    };


    const addNode = (key: string) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.addNode(key);
            return newClassTreeData;

        });
        setDataGenerated(false);
    }

    const removeNode = (key: string) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.removeNode(key);
            return newClassTreeData;
        });
        setDataGenerated(false);
    }

    const changeDivider = (key: string, divider: DataDivider) => {
        setClassTreeData((prevClassTreeData) => {
            const newClassTreeData = new Tree();
            Object.assign(newClassTreeData, prevClassTreeData);
            newClassTreeData.changeDivider(key, divider);
            return newClassTreeData;
        });
        setDataGenerated(false);
    }

    return (
        <PlotDataContext.Provider value={{ plotData, generateData, classTreeData, addNode, removeNode, changeDivider, dataGenerated, classesColors }}>
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