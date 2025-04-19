import DataDivider from "./DataDivider";

export default class LinearDivider extends DataDivider {
    constructor() {
        super();
    }

    evaluate(x: number, y: number): boolean {
        const theta = this.deg * Math.PI / 180 + Math.PI / 4 * 5;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        return cosT * (y + this.shiftY) - sinT * (x - this.shiftX) < (sinT * (y + this.shiftY) + cosT * (x - this.shiftX));
    }
}
