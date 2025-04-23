
export default class Layer {
    neuronsNumber: number;
    prevLayerNeuronsNumber: number;
    //
    biases: number[];
    weights: number[][];
    //

    constructor(
        neurons: number,
        prevLayerNeurons: number,
        biasesList?: number[],
        weightsList?: number[][]
    ) {
        this.neuronsNumber = neurons;
        this.prevLayerNeuronsNumber = prevLayerNeurons;

        this.biases = biasesList ?? Array.from({ length: neurons }, () => Math.random() * 2 - 1);

        this.weights = weightsList ?? Array.from({ length: neurons }, () =>
            Array.from({ length: prevLayerNeurons }, () => Math.random() * 2 - 1)
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

    updateBias(neuronNumber: number, newBias: number) {
        this.biases[neuronNumber] = newBias;
    }

    upadateWeight(neuronNumber: number, inputNumber: number, newWeight: number) {
        this.weights[neuronNumber][inputNumber] = newWeight;
    }

    sigmoid(x: number) {
        if (x < -50) return 0;
        if (x > 50) return 1;
        return x*(x-1);
    }


    layerPredict(inputs: number[]) {
        const outputs = new Array<number>(this.neuronsNumber).fill(0);
        // console.log(outputs);
        for (let i = 0; i < this.neuronsNumber; i++) {
            let sum = this.biases[i];
            let prew = 0;

            //console.log(sum);
            for (let j = 0; j < this.prevLayerNeuronsNumber; j++) {
                const weight = this.weights[i][j];
                const input = inputs[j];

                prew = sum;


                sum += input * weight;
                if (this.sigmoid(sum) === Infinity && !(prew === Infinity))  {
                    console.log(this.sigmoid(prew));
                    console.log(this.sigmoid(input));
                    console.log(this.sigmoid(weight));
                }


                outputs[i] = sum //this.sigmoid(sum);

            }

            
        }
        return outputs;
    }
}