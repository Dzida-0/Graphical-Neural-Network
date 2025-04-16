
export default abstract class DataDivider {
    deg: number;
    shiftX: number;
    shiftY: number;

    constructor() {
        this.deg = 45;
        this.shiftX = 0;
        this.shiftY = 0;
    }

    abstract evaluate(x: number, y: number): boolean;
}