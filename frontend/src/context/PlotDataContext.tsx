import React, { createContext, useState, useContext } from "react";
import PlotData from "./../models/data/PlotData";
import Tree from "../models/data/Tree";
//import TreeNode from "../models/data/TreeNode";
import { PlotAPI } from "./../api/PlotDataAPI";

interface PlotDataContextInterface {
    plotData: PlotData;
    generateData: (patern: number) => void;
    classTreeData: Tree;
   // getNodeByKey: (key: string) => TreeNode;
    addNode: (key: string) => void;
    removeNode: (key: string) => void;
  //  moveNode: (from: string, to: string) => void;
}

const PlotDataContext = createContext<PlotDataContextInterface | undefined>(undefined);

export const PlotDataProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [plotData, setPlotData] = useState(new PlotData());
    const [classTreeData] = useState(new Tree());

    const generateData = async (patern: number) => {
     
        try {
            if(patern == 100000) return;
            const newData = await PlotAPI("generate", pageId, "POST");
            

            if (newData) {
                setPlotData(new PlotData(newData.pointsCount, newData.classCount, newData.points));
            }
        } catch (error) {
            console.error("Error in generateData:", error);
        }
    };


    const addNode = (key: string) => {
         classTreeData.addNode(key);
    }

    const removeNode = (key: string) => {
        classTreeData.removeNode(key);
    }

    return (
        <PlotDataContext.Provider value={{ plotData, generateData, classTreeData, addNode, removeNode }}>
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