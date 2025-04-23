import Network from "../../models/network/Network";
import Point from "../../models/data/Point";

test("Network should return consistent outputs", () => {
    const network = new Network();
    const point = new Point(1, 2, 1); // Expected class 1

    const output1 = network.predict([point.x, point.y]);
    const output2 = network.predict([point.x, point.y]);

    expect(output1).toEqual(output2);
});
