
export default class Layer {
    neuronsNumber: number;
    prevLayerNeuronsNumber: number;
    //
    biases: number[];
    weights: number[][];
    //

    constructor(neurons: number, prevLayerneurons: number, baiesesList?: number[], weightsList?: number[][]) {
        this.neuronsNumber = neurons;
        this.prevLayerNeuronsNumber = prevLayerneurons;
        this.biases = baiesesList ?? new Array(this.neuronsNumber).fill(0);
        this.weights = weightsList ??  Array.from({ length: this.neuronsNumber }, () =>
            new Array(this.prevLayerNeuronsNumber).fill(0).map(() => Math.random() * 2 - 1)
        );



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

    updateBias(neuronNumber: number ,newBias: number) {
        this.biases[neuronNumber] = newBias;
    }

    upadateWeight(neuronNumber: number, inputNumber: number, newWeight: number) {
        this.weights[neuronNumber][inputNumber] = newWeight;
    }

    sigmoid(x: number) { return 1 / (1 + Math.exp(-x)) }


    layerPredict(inputs: number[]) {
        const outputs = new Array(this.neuronsNumber).fill(0);

        for (let i = 0; i < this.neuronsNumber; i++) {
            let sum = this.biases[i];
            for (let j = 0; j < this.prevLayerNeuronsNumber; j++) {
                sum += inputs[j] * this.weights[i][j];
            }
            outputs[i] = this.sigmoid(sum); 
        }
        return outputs;
    }
}