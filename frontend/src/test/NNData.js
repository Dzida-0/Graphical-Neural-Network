import { createContext, useState } from "react";

export const NNData = createContext();

export function NNProvider({ children }) {
    const [network, setNetwork] = useState({
        layers: { in: ["in_1", "in_2"], h1: ["h1_1"], h2: ["h2_1", "h2_2", "h2_3"], out: ["out_1", "out_2"] },
        weights: {
            in: {},
            h1: {},
            h2: {}
        },
        biases: {
            h1: { h1_1: 0 },
            h2: { h2_1: 0, h2_2: 0, h2_3: 0 },
            out: { out_1: 0, out_2: 0 }
        }
    });

    const updateNetwork = (network) => {
        setNetwork((prevNetwork) => {
            const updatedNetwork = { ...prevNetwork, ...network }
            return updatedNetwork;
        });
    };

    const removeNeuron = (neuronName) => {
        console.log(neuronName)
        setNetwork((prevNetwork) => {
            // get layer name and chack if neuron and layer exists
            const layerName = neuronName.split("_")[0];
            if (!prevNetwork.layers[layerName]) return prevNetwork;
            if (!network.layers[layerName].includes(neuronName)) return network;

            // coppy of all elements
            const updatedLayers = { ...prevNetwork.layers };
            const updatedWeights = { ...prevNetwork.weights };
            const updatedBiases = { ...prevNetwork.biases };

            // remove neuron from layers and reasign numbers
            updatedLayers[layerName] = updatedLayers[layerName].filter(n => n !== neuronName);
            updatedLayers[layerName] = updatedLayers[layerName].map((_, i) => `${layerName}_${i + 1}`);

            // remove neuron from biases and reasign numbers
            delete updatedBiases[layerName][neuronName];
            const newBiases = {};
            Object.keys(updatedBiases[layerName]).forEach((oldNeuron, i) => {
                const newNeuron = `${layerName}_${i + 1}`;
                newBiases[newNeuron] = updatedBiases[layerName][oldNeuron] ?? 0;
            });
            updatedBiases[layerName] = newBiases; 

            // remove neuron from weigths and reasign numbers


            console.log(updatedLayers, updatedWeights, updatedBiases)

            return {
                layers: { ...updatedLayers },
                weights: { ...updatedWeights },
                biases: { ...updatedBiases },
            };
        });
    };

    const addNeuron = (layer) => {
        setNetwork((prevNetwork) => {
            // copies 
            const updatedLayers = { ...prevNetwork.layers };
            const updatedBiases = { ...prevNetwork.biases };
            const updatedWeights = { ...prevNetwork.weights };

            // add neuron
            const newNeuronId = `${layer}_${updatedLayers[layer].length + 1}`;
            updatedLayers[layer] = [...updatedLayers[layer], newNeuronId];

            // add baies
            const newBiasKey = `${layer}_${updatedLayers[layer].length}`;
            updatedBiases[layer][newBiasKey] = 0; 

   
            return {
                layers: updatedLayers,
                biases: updatedBiases,
                weights: updatedWeights,
            };
        });
    };

    const removeLayer = (layer) => {

    }

    const addLayer = (layer) => {

    }


    return (
        <NNData.Provider value={{ network, updateNetwork, setNetwork, removeNeuron,addNeuron }}>
            {children}
        </NNData.Provider>
    );
}
