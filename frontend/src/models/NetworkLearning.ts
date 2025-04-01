import Point from "./data/Point";
import Network from "./network/Network";

export default async function NetworkLearning(epochs: number, learningRate: number, points: Point[], network: Network,
    updateMetrics: (accuracy: number, cost: number) => void) {
   
    const backpropagation = (point: Point) => {
        const outputs: number[][] = [];
        let inputs = [point.x, point.y];

        // Fix: Properly initialize error arrays for each layer
        const errors: number[][] = network.layers.map(layer => new Array(layer.neuronsNumber).fill(0));

        // Forward Pass
        network.layers.forEach((layer) => {
            inputs = layer.layerPredict(inputs);
            outputs.push(inputs);
        });

        // Compute error for output layer
        for (let i = 0; i < network.outputsNumber; i++) {
            errors[errors.length - 1][i] = CostDerv(outputs[outputs.length - 1][i], point.expectedOutput[i]) * ActivationDerv(outputs[outputs.length - 1][i]);
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
                errors[layerIndex][i] = errorSum * ActivationDerv(outputs[layerIndex][i]);
            }
        }

        // Update weights and biases
        for (let layerIndex = 0; layerIndex < network.layers.length; layerIndex++) {
            const layer = network.layers[layerIndex];
            const prevInputs = layerIndex === 0 ? [point.x, point.y] : outputs[layerIndex - 1];

            for (let i = 0; i < layer.neuronsNumber; i++) {
                for (let j = 0; j < layer.prevLayerNeuronsNumber; j++) {
                    layer.weights[i][j] -= learningRate * errors[layerIndex][i] * prevInputs[j];
                }
                layer.biases[i] -= learningRate * errors[layerIndex][i];
            }
        }
    };

    const CostFunction = (output: number, expected: number) => Math.pow(output - expected, 2); // Mean Squared Error

    // Cost function and derivatives
    const CostDerv = (output: number, expected: number) => 2 * (output - expected);
    const ActivationDerv = (output: number) => 1 - Math.pow(output, 2);

    // Main training loop
    for (let epoch = 0; epoch < epochs; epoch++) {
        let correctPredictions = 0;
        let totalCost = 0;

        for (const point of points) {
            const prediction = network.predict([point.x, point.y]);
            if (prediction.indexOf(Math.max(...prediction)) === point.class) correctPredictions++;

            // Compute cost
            const expectedOutput = Array.from({ length: network.outputsNumber }, (_, i) => Number(point.class === i));
            const actualOutput = network.predict([point.x, point.y]); // Get raw outputs
            totalCost += expectedOutput.reduce((sum, expected, i) => sum + CostFunction(actualOutput[i], expected), 0);

            backpropagation(point);
        }

        // Compute accuracy & cost
        const accuracy = (correctPredictions / points.length) * 100;
        const averageCost = totalCost / points.length;

        // Update UI with new metrics
        updateMetrics(accuracy, averageCost);

        // Updating UI asynchronously
        await new Promise((r) => setTimeout(r, 0));
    }
}
