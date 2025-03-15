
export default class Layer {
    neuronsNumber: number;
    prevLayerNeuronsNumber: number;
    //
    biases: number[];
    weights: number[][];
    //

    constructor(neurons: number, prevLayerneurons: number, baiesesList?: number[], weightsList?: number[][] ) {
        this.neuronsNumber = neurons;
        this.prevLayerNeuronsNumber = prevLayerneurons;
        this.biases = baiesesList ?? new Array(this.neuronsNumber).fill(0);
        this.weights = weightsList ?? new Array(this.neuronsNumber).fill(new Array(this.prevLayerNeuronsNumber).fill(0));

    }

    addNeuron() {
        this.neuronsNumber++;
        this.biases.push(0);
        this.weights.push(new Array(this.prevLayerNeuronsNumber).fill(0));
    }

    removeNeuron(neuronNumber: number) {
        this.neuronsNumber--;
        this.biases.splice(neuronNumber, 1);
        this.weights.splice(neuronNumber, 1);
    }
}