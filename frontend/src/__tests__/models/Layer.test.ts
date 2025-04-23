import Layer from "../../models/network/Layer";

describe("Layer class", () => {

    test("Constructor initializes with provided values", () => {
        const layer = new Layer(2, 3, [0.5, -0.5], [[0.1, 0.2, 0.3], [-0.1, -0.2, -0.3]]);
        expect(layer.biases).toEqual([0.5, -0.5]);
        expect(layer.weights).toEqual([[0.1, 0.2, 0.3], [-0.1, -0.2, -0.3]]);
    });

    test("Adding a neuron updates biases and weights", () => {
        const layer = new Layer(2, 3);
        layer.addNeuron();

        expect(layer.neuronsNumber).toBe(3);
        expect(layer.weights.length).toBe(3);
    });
});