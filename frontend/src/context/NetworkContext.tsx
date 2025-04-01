import React, { createContext, useState, useContext } from "react";
import Network from "../models/network/Network";
import { updateNetwork } from "./../api/NetworkAPI";

interface NetworkContextInterface {
    network: Network;
    addNeuron: (layerIndex: number) => void;
    removeNeuron: (layerIndex: number, neuronIndex: number) => void;
    addLayer: (index: number) => void;
    removeLayer: (index: number) => void;
    predictPoints: (inputs: number[]) => number;
    updateBias: (layerNumber: number, neuronNumber: number, newBias: number) => void;
    updateWeight: (layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) => void;
    updateClassCount: (count: number) => void;
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

    const updateBias = (layerNumber: number, neuronNumber: number, newBias: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateBaies(layerNumber, neuronNumber, newBias);
            return newNetwork;
        });
    }

    const updateWeight = (layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateWeight(layerNumber, neuronNumber, inputNumber, newWeight);
            return newNetwork;
        });
    }

    const updateClassCount = (count: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateOutputsNumber(count);
            return newNetwork;
        });
    }

    const predictPoints = (inputs: number[]) => {
        const outputs = network.predict(inputs);
        return outputs.indexOf(Math.max(...outputs));
    };

    return (
        <NetworkContext.Provider value={{ network, addNeuron, removeNeuron, addLayer, removeLayer, predictPoints, updateBias, updateWeight, updateClassCount }}>
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

