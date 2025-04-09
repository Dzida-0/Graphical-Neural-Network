
export default abstract class DataDivider {
    angle: number;
    a: number;
    b: number;
    constructor() {
        this.angle = 45
        this.a = 1;
        this.b = 0;
    }

    changeAngle(ang: number) {
        this.angle = ang;
        this.a = Math.tan(ang + 0.01);
    }


};