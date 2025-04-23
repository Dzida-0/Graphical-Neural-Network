import Point from "./data/Point";
import Network from "./network/Network";
import getActivation from "./network/Activation";

export default async function NetworkLearning(
    epochs: number,
    learningRate: number,
    batchSize: number,
    allPoints: Point[],
    activation: string,
    cost: string,
    optimizerType: string,
    network: Network,
    updateMetrics: (accuracy: number, cost: number) => void
)
{ 
    const { activationFunction, activationDerivative } = getActivation(activation);
    const optimizer = createOptimizer(optimizerType, learningRate);
    
    function createOptimizer(type: string, learningRate: number) {
        const vW: number[][][] = [];
        const vB: number[][] = [];
        const mW: number[][][] = [];
        const mB: number[][] = [];
        let t = 1;
        const beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8;

        return {
            update: (
                weights: number[][],
                biases: number[],
                gradientsW: number[][],
                gradientsB: number[],
                layerIndex: number
            ) => {
                if (!vW[layerIndex]) {
                    vW[layerIndex] = gradientsW.map(r => r.map(() => 0));
                    vB[layerIndex] = gradientsB.map(() => 0);
                    mW[layerIndex] = gradientsW.map(r => r.map(() => 0));
                    mB[layerIndex] = gradientsB.map(() => 0);
                }

                switch (type) {
                    case 'sgd':
                        for (let i = 0; i < weights.length; i++) {
                            for (let j = 0; j < weights[i].length; j++) {
                                weights[i][j] = Math.max(-100, Math.min(100, weights[i][j] - learningRate * gradientsW[i][j])); 
                            }
                            biases[i] = Math.max(-100, Math.min(100, biases[i] - learningRate * gradientsB[i]));
                        }
                        break;

                    case 'momentum':
                        {
                            const momentum = 0.1;
                            for (let i = 0; i < weights.length; i++) {
                                for (let j = 0; j < weights[i].length; j++) {
                                    vW[layerIndex][i][j] = momentum * vW[layerIndex][i][j] - learningRate * gradientsW[i][j];
                                    weights[i][j] += vW[layerIndex][i][j];
                                }
                                vB[layerIndex][i] = momentum * vB[layerIndex][i] - learningRate * gradientsB[i];
                                biases[i] += vB[layerIndex][i];
                            }
                        }
                        break;

                    case 'adam':
                        for (let i = 0; i < weights.length; i++) {
                            for (let j = 0; j < weights[i].length; j++) {
                                mW[layerIndex][i][j] = beta1 * mW[layerIndex][i][j] + (1 - beta1) * gradientsW[i][j];
                                vW[layerIndex][i][j] = beta2 * vW[layerIndex][i][j] + (1 - beta2) * Math.pow(gradientsW[i][j], 2);
                                const mHat = mW[layerIndex][i][j] / (1 - Math.pow(beta1, t));
                                const vHat = vW[layerIndex][i][j] / (1 - Math.pow(beta2, t));
                                weights[i][j] -= learningRate * mHat / (Math.sqrt(vHat) + epsilon);
                            }

                            mB[layerIndex][i] = beta1 * mB[layerIndex][i] + (1 - beta1) * gradientsB[i];
                            vB[layerIndex][i] = beta2 * vB[layerIndex][i] + (1 - beta2) * Math.pow(gradientsB[i], 2);
                            const mHatB = mB[layerIndex][i] / (1 - Math.pow(beta1, t));
                            const vHatB = vB[layerIndex][i] / (1 - Math.pow(beta2, t));
                            biases[i] -= learningRate * mHatB / (Math.sqrt(vHatB) + epsilon);
                        }
                        t++;
                        break;
                }
            }
        };
    }



    function getRandomBatch(batchSize: number, allPoints: Point[]): Point[] {
        const sampleCount = Math.floor((batchSize / 100) * allPoints.length);
        const shuffled = [...allPoints].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, sampleCount);
    }



    // cost function 
    type CostFunction = (output: number[], expected: number[]) => number;
    type CostDerivativeFunction = (output: number, expected: number) => number;
    let costFunction: CostFunction;
    let costDerivative: CostDerivativeFunction;

    switch (cost) {
        case "mse": 
            costFunction = (output, expected) =>
                output.reduce((sum, o, i) => sum + Math.pow(o - expected[i], 2), 0) / output.length;

            costDerivative = (output, expected) =>
                2 * (output - expected);
            break;

        case "crossentropy": 
            costFunction = (output, expected) =>
                -output.reduce((sum, o, i) => sum + expected[i] * Math.log(o + 1e-9), 0); 

            costDerivative = (output, expected) =>
                -(expected / (output + 1e-9)); 
            break;

    }



    const backpropagation = (point: Point) => {
        const outputs: number[][] = [];
        let inputs = [point.x / 20 + 0.5, point.y / 20 + 0.5];

        // Fix: Properly initialize error arrays for each layer
        const errors: number[][] = network.layers.map(layer => new Array(layer.neuronsNumber).fill(0));

        // Forward Pass
        network.layers.forEach((layer) => {
            inputs = layer.layerPredict(inputs);

            // Apply dropout if enabled
            //if (dropout > 0) {
                //inputs = applyDropout(inputs, dropout);  // Apply dropout here after getting the layer output
           // }
            outputs.push(inputs);
        });

        // Compute error for output layer
        for (let i = 0; i < network.outputsNumber; i++) {
            errors[errors.length - 1][i] = costDerivative(outputs[outputs.length - 1][i], point.expectedOutput[i]) * activationDerivative(outputs[outputs.length - 1][i]);
        }

        // Backpropagate errors through hidden layers
        for (let layerIndex = network.layers.length - 2; layerIndex >= 0; layerIndex--) {
            const layer = network.layers[layerIndex];
            const nextLayer = network.layers[layerIndex + 1];

            for (let i = 0; i < layer.neuronsNumber; i++) {
                let errorSum = 0;
                for (let j = 0; j < nextLayer.neuronsNumber; j++) {
                    errorSum += errors[layerIndex + 1][j] * nextLayer.weights[j][i];
                }
                errors[layerIndex][i] = errorSum * activationDerivative(outputs[layerIndex][i]);
            }
        }

        // === ✅ Weight and bias update using optimizer ===
        for (let layerIndex = 0; layerIndex < network.layers.length; layerIndex++) {
            const layer = network.layers[layerIndex];
            const prevInputs = layerIndex === 0
                ? [point.x / 20 + 0.5, point.y / 20 + 0.5]
                : outputs[layerIndex - 1];

            // 🔹 This is what you asked to see:
            const gradientsW = layer.weights.map((row, i) =>
                row.map((_, j) => errors[layerIndex][i] * prevInputs[j])
            );
            const gradientsB = errors[layerIndex];

            // 🔹 Optimizer does the actual update:
            optimizer.update(layer.weights, layer.biases, gradientsW, gradientsB, layerIndex);
        }
    };


   
    // Main training loop
    for (let epoch = 0; epoch < epochs; epoch++) {
        const points = getRandomBatch(batchSize, allPoints);
        let correctPredictions = 0;
        let totalCost = 0;

        //if (dropout > 0)
          //  dropout = Math.max(0.2, dropout - 0.01); 

        for (const point of points) {
            //console.log(point);
            const prediction = network.predict( [point.x / 20 + 0.5, point.y / 20 + 0.5] , activationFunction);
            if (prediction.indexOf(Math.max(...prediction)) === point.class) correctPredictions++;

            // Compute cost
            const expectedOutput = Array.from({ length: network.outputsNumber }, (_, i) => Number(point.class === i));
            //console.log(expectedOutput);
            const actualOutput = network.predict( [point.x / 20 + 0.5, point.y / 20 + 0.5] , activationFunction); // Get raw outputs
            //console.log(actualOutput);
            totalCost += costFunction(actualOutput, expectedOutput);
            //console.log(expectedOutput);
            //console.log(totalCost);
            backpropagation(point);
        }

        // Compute accuracy & cost
        const accuracy = (correctPredictions / points.length) * 100;
        const averageCost = totalCost / points.length;
        //console.log(totalCost);
        //console.log(averageCost);
        // Update UI with new metrics
        updateMetrics(accuracy, averageCost);

        // Updating UI asynchronously
        await new Promise((r) => setTimeout(r, 0));
    }
}
