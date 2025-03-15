import React, { createContext, useState, useContext } from "react";
import PlotData from "../models/PlotData";
import { changeData } from "./../api/PlotDataAPI";

interface PlotDataContextInterface {
    plotData: PlotData;
    generateData: () => void;
}

const PlotDataContext = createContext<PlotDataContextInterface | undefined>(undefined);

export const PlotDataProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [plotData, setPlotData] = useState(new PlotData());

    const generateData = () => {
        setPlotData((prevData) => {
            const newData = changeData("d", pageId, 1);
            return newData instanceof PlotData ? newData : prevData;
        });
    };

    return (
        <PlotDataContext.Provider value={{ plotData, generateData }}>
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