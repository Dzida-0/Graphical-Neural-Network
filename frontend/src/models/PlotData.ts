
export default class PlotData {
    pointsCount: number;
    classCount: number;
    classColors: { [key: number]: string } = {
        0: "blue",
        1: "red",
        2: "yellow",
        3: "purple",
        4: "green"
    };

    constructor() {
        this.pointsCount = 200;
        this.classCount = 2;

    }

}