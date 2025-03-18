import Network from "./../../models/Network";
import Point from "./../../models/Point";
import NetworkLearning from "./../../models/NetworkLearning";


test("Accuracy should improve after training", async () => {
    const network = new Network();
    const points = [
        new Point(0, 0, 1),
        new Point(1, 1, 0),
        new Point(0, 1, 0),
        new Point(1, 0, 1)
    ];

    let initialCorrect = 0;
    points.forEach(point => {
        const prediction = network.predict([point.x, point.y]);
        if (prediction.indexOf(Math.max(...prediction)) === point.class) initialCorrect++;
    });

    await NetworkLearning(1000, 0.1, points, network, () => { });

    let finalCorrect = 0;
    points.forEach(point => {
        const prediction = network.predict([point.x, point.y]);
        if (prediction.indexOf(Math.max(...prediction)) === point.class) finalCorrect++;
    });

    expect(finalCorrect).toBeGreaterThan(initialCorrect);
});
