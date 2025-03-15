import React, { createContext, useState, useContext } from "react";
import Network from "../models/Network";
import { updateNetwork } from "./../api/NetworkAPI";

interface NetworkContextInterface {
    network: Network;
    addNeuron: (layerIndex: number) => void;
    removeNeuron: (layerIndex: number, neuronIndex: number) => void;
    addLayer: (index: number) => void;
    removeLayer: (index: number) => void;
}

const NetworkContext = createContext<NetworkContextInterface | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [network, setNetwork] = useState(new Network());

    const addNeuron = (layerIndex: number) => {
        
        setNetwork((prevNetwork) => {
            const newNetwork = new Network(); 
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.addNode(layerIndex); 
            updateNetwork("addNeuron", pageId, 1);
            return newNetwork; 
        });

    };

    const removeNeuron = (layerIndex: number, neuronIndex: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.removeNode(layerIndex, neuronIndex);
            return newNetwork; 
        });
    };

    const addLayer = (index: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.addLayer(index);
            return newNetwork; 
        });
    };

    const removeLayer = (index: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.removeLayer(index);
            return newNetwork; 
        });
    };

    return (
        <NetworkContext.Provider value={{ network, addNeuron, removeNeuron, addLayer, removeLayer }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => {
    const context = useContext(NetworkContext);
    if (!context) {
        throw new Error("useNetwork must be used within a NetworkProvider");
    }
    return context;
};

