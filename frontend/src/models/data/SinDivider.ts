import DataDivider from "./DataDivider";

export default class SinDivider extends DataDivider {
    wavelength: number;
    amplitude: number;
    constructor() {
        super();
        this.wavelength = 1;
        this.amplitude = 1;
    }

    evaluate(x: number, y: number): boolean {
        const theta = this.deg * Math.PI / 180;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        return cosT * (y + this.shiftY) - sinT * (x - this.shiftX) < Math.sin((sinT * (y + this.shiftY) + cosT *(x-this.shiftX)*this.wavelength))*this.amplitude;
    }
}
