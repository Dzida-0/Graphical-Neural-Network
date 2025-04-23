
export default function getActivation(type: string): {
    activationFunction: (inputs: number[]) => number[];
    activationDerivative: (output: number) => number;
} {
    const clamp = (value: number, min: number, max: number) =>
        Math.max(min, Math.min(max, value));

    switch (type) {
        case "sigmoid":
            return {
                activationFunction: (inputs) => inputs ?? [].map(x => 1 / (1 + Math.exp(-x))),
                activationDerivative: (y) => clamp(y * (1 - y), 0.0001, 1),
            };
        case "tanh":
            return {
                activationFunction: (inputs) => inputs.map(x => Math.tanh(x)),
                activationDerivative: (y) => clamp(1 - y * y, 0.0001, 1),
            };
        case "relu":
            return {
                activationFunction: (inputs) => inputs.map(x => Math.max(0, x)),
                activationDerivative: (y) => (y > 0 ? 1 : 0),
            };
        case "leakyrelu":
            return {
                activationFunction: (inputs) => inputs.map(x => (x > 0 ? x : 0.01 * x)),
                activationDerivative: (y) => (y > 0 ? 1 : 0.01),
            };
        case "elu":
            return {
                activationFunction: (inputs) => inputs.map(x => (x >= 0 ? x : Math.expm1(x))),
                activationDerivative: (y) => clamp(y >= 0 ? 1 : y + 1.0, -1, 1),
            };
        default:
            return {
                activationFunction: (inputs) => inputs,
                activationDerivative: () => 1,
            };
    }
}
