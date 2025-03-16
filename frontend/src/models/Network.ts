import Layer from "./Layer";

export default class Network {
    layers: Layer[];
    //
    maxHidenLayers: number = 4;
    maxNeurons: number = 10;
    //
    inputsNumber: number = 2;
    outputsNumber: number = 2;
    //
    hidenLayerCount: number = 2;

    constructor() {
        this.layers = [
            new Layer(1, 2, [0], [[-0.5, -0.8]]),
            new Layer(2, 1, [0, 1], [[0.7], [-1]])
        ];
    }


    // add node to layer
    addNode(layerNumber: number) {
        if (this.layers[layerNumber].neuronsNumber >= this.maxNeurons) return;
        if (layerNumber >= this.hidenLayerCount) return;
        this.layers[layerNumber].addNeuron();
        if (layerNumber < this.hidenLayerCount)
            for (let i = 0; i < this.layers[layerNumber + 1].weights.length;i++)
            this.layers[layerNumber + 1].weights[i].push(0);

    }

    // remove node from layer
    removeNode(layerNumber: number, neuronsNumber: number) {
        if (layerNumber >= this.hidenLayerCount) return;
        if (this.layers[layerNumber].neuronsNumber == 1) {
            this.removeLayer(layerNumber);
            return;
        }
        this.layers[layerNumber].removeNeuron(neuronsNumber);
        //
        for (let i = 0; i < this.layers[layerNumber + 1].weights.length; i++)
            this.layers[layerNumber + 1].weights[i].splice(neuronsNumber, 1);


    }

    // add new layer
    addLayer(index: number) {
        if (this.hidenLayerCount == this.maxHidenLayers) return;
        if (index == 0)
            this.layers.splice(index, 0, new Layer(1, 2));
        else
            this.layers.splice(index, 0, new Layer(1, this.layers[index].neuronsNumber));
        // update next layer
        this.layers[index + 1].prevLayerNeuronsNumber = 1;
        this.layers[index + 1].weights = new Array(this.layers[index + 1].neuronsNumber).fill(new Array(1).fill(0));
        this.hidenLayerCount++;
    }

    // remove layer | should be ony called when layer has one node
    removeLayer(laterNumber: number) {
        if (this.hidenLayerCount == 1) return;
        // cant remove last
        if (this.hidenLayerCount == laterNumber) return;
        // update next layer baies
        this.layers[laterNumber + 1].prevLayerNeuronsNumber = this.layers[laterNumber].prevLayerNeuronsNumber;
        // update next layer weights
        this.layers[laterNumber + 1].weights = new Array(this.layers[laterNumber + 1].neuronsNumber).fill(new Array(this.layers[laterNumber].prevLayerNeuronsNumber).fill(0));
        // remove layer
        this.layers.splice(laterNumber, 1);
        this.hidenLayerCount--;
    }

    updateBaies(layerNumber: number, neuronNumber: number, newBias: number) {
        this.layers[layerNumber].updateBias(neuronNumber, newBias);
    }

    updateWeight(layerNumber: number, neuronNumber: number, inputNumber: number, newWeight: number) {
        this.layers[layerNumber].upadateWeight(neuronNumber, inputNumber, newWeight);
    }

    predict(inputs: number[]) {
        
        let outputs = inputs;
        this.layers.forEach((layer: Layer) => {
            outputs = layer.layerPredict(outputs);
        });
        //console.log(outputs);
        return outputs.indexOf(Math.max(...outputs));;
    }
}