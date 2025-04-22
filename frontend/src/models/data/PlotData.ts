import Point from './Point';

export default class PlotData {
    pointsCount: number;
    classCount: number;
    points: Point[];
    classColors: { [key: number]: string } = {
        0: "blue",
        1: "red",
        2: "yellow",
        3: "purple",
        4: "green"
    };

    constructor(newPointsCount?: number, newClassCount?: number, newPoints?: Point[],) {
        this.pointsCount = newPointsCount ?? 200;
        this.classCount = newClassCount ?? 2;
        this.points = newPoints ?? Array.from({ length: this.pointsCount }, () => new Point(0, 0, 0,[1,0]));
        this.changeClassCount(newClassCount ?? 2);
    }

    changeClassCount(newClassCount: number) {
        this.classCount = newClassCount;
        for (const point of this.points) {
            point.expectedOutput = Array.from({ length: newClassCount }, (_, i) => Number(point.class === i));
        }
    }

}