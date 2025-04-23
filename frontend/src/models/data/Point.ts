
export default class Point {
    x: number;
    y: number;
    class: number;
    expectedOutput: number[] = [];

    constructor(posX: number, posY: number, classNr: number, expectedOutput: number[]) {
        this.x = posX;
        this.y = posY;
        this.class = classNr;
        this.expectedOutput = expectedOutput;
    }
}