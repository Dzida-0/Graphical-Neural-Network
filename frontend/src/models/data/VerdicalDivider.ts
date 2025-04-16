import DataDivider from "./DataDivider";

export default class VerdicalDivider extends DataDivider {
    frequency: number;

    constructor() {
        super();
        this.frequency = 1;
    }

    evaluate(x: number, y: number): boolean {
        const theta = this.deg * Math.PI / 180;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta); 
        return cosT * (y + this.shiftY) - sinT * (x - this.shiftX) < Math.tan((sinT * (y + this.shiftY) + cosT * (x - this.shiftX)) * this.frequency)*1000 + 20;
    }
}

