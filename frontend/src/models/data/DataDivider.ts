
export default abstract class DataDivider {
    deg: number;
    a: number;
    b: number;
    reversed: boolean;

    constructor() {
        this.deg = 45;
        this.a = 1;
        this.b = 0;
        this.reversed = false;
    }

    changeDeg(newDeg: number) {
        this.deg = newDeg;
        this.reversed = newDeg >= 180;
        if (this.reversed) newDeg -= 180;
        this.a = Math.tan(Math.max(newDeg*Math.PI/180, 0.0001));
    }

    changeShift(newB: number) {
        this.b = newB;
    }

    abstract evaluate(x: number, y: number): boolean;
}