import DataDivider from "./DataDivider";

export default class SquaredDivider extends DataDivider {
    width: number;
    constructor() {
        super();
        this.width = 1;
    }

    evaluate(x: number, y: number): boolean {
        const theta = this.deg * Math.PI / 180;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        return cosT * (y + this.shiftY) - sinT * (x - this.shiftX) < -Math.pow(((sinT * (y + this.shiftY) + cosT * (x - this.shiftX)) * this.width), 2);
    }

}
