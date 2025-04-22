import React, { createContext, useState, useContext, useEffect } from "react";
import Network from "../models/network/Network";
import { updateNetwork, getNetwork } from "./../api/NetworkAPI";
import Layer from "../models/network/Layer";

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
    collapsed: { [key: string]: boolean };
    updateCollapsed: (key: string, value: boolean) => void;
}

const NetworkContext = createContext<NetworkContextInterface | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode; pageId: number }> = ({ children, pageId }) => {
    const [network, setNetwork] = useState<Network>(new Network());

    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({
        Network: false,
        Sliders: true,
    });

    useEffect(() => {
        const fetchNetwork = async () => {
            const fetched = await getNetwork(pageId);
            if (fetched) {
                const loaded = new Network();
                Object.assign(loaded, fetched);

                // Reconstruct each Layer from plain object to real class instance
                loaded.layers = fetched.layers.map((layerData: any) => {
                    const layer = new Layer(layerData.neuronsNumber, layerData.prevLayerNeuronsNumber);
                    layer.biases = [...layerData.biases];
                    layer.weights = layerData.weights.map((w: number[]) => [...w]);
                    return layer;
                });

                setNetwork(loaded);
            }
        };
        fetchNetwork();
    }, [pageId]);


    const addNeuron = (layerIndex: number) => {
        
        setNetwork((prevNetwork) => {
            const newNetwork = new Network(); 
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.addNode(layerIndex); 
            updateNetwork("addN", pageId, { layerIndex:layerIndex });
            return newNetwork; 
        });

    };

    const removeNeuron = (layerIndex: number, neuronIndex: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.removeNode(layerIndex, neuronIndex);
            console.log("Sending RemN request", {
                PageId: pageId,
                Data: {
                    layerIndex,
                    neuronIndex,
                },
            });
            
            return newNetwork; 
        });
        updateNetwork("RemN", pageId, { layerIndex: layerIndex, neuronIndex: neuronIndex });
    };

    const addLayer = (index: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.addLayer(index);
            updateNetwork("addL", pageId, { index: index });
            return newNetwork; 
        });
    };

    const removeLayer = (index: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork); 
            newNetwork.removeLayer(index);
            updateNetwork("RemL", pageId, { index: index });
            return newNetwork; 
        });
    };

    const updateBias = (layerNumber: number, neuronNumber: number, newBias: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateBaies(layerNumber, neuronNumber, newBias);
            updateNetwork("UpdB", pageId, { layerIndex: layerNumber, neuronIndex: neuronNumber, newBias: newBias });
            return newNetwork;
        });
    }

    const updateWeight = (layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateWeight(layerNumber, neuronNumber, inputNumber, newWeight);
            updateNetwork("UpdW", pageId, { layerIndex: layerNumber, neuronIndex: neuronNumber, inputIndex: inputNumber, newWeight: newWeight });
            return newNetwork;
        });
    }

    const updateClassCount = (count: number) => {
        setNetwork((prevNetwork) => {
            const newNetwork = new Network();
            Object.assign(newNetwork, prevNetwork);
            newNetwork.updateOutputsNumber(count);
            updateNetwork("UpdCC", pageId, { count: count });
            return newNetwork;
        });
    }

    const predictPoints = (inputs: number[]) => {
        const outputs = network.predict(inputs);
        return outputs.indexOf(Math.max(...outputs));
    };

    const updateCollapsed = (key: string, value: boolean) => {
        setCollapsed((prevCollapsed) => {
            const newCollapsed = { ...prevCollapsed };
            newCollapsed[key] = value; 
            updateNetwork("UpdCol", pageId, { key: "Network", value: value });
            return newCollapsed;
        });
    };

    return (
        <NetworkContext.Provider value={{ network, addNeuron, removeNeuron, addLayer, removeLayer, predictPoints, updateBias, updateWeight, updateClassCount, collapsed, updateCollapsed }}>
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

