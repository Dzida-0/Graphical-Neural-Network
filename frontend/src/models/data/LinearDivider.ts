import DataDivider from "./DataDivider";

export default class LinearDivider extends DataDivider {
    constructor() {
        super();
    }

    evaluate(x: number, y: number): boolean {
        if (this.reversed) return this.a * x + this.b > y;
        return this.a * x + this.b < y;
    }
}
