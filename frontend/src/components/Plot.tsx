import { useEffect, useRef } from "react";
import { useNetwork } from "./../context/NetworkContext";
import { usePlotData } from "./../context/PlotDataContext";
import Point from "./../models/data/Point";
import TreeNode from "./../models/data/TreeNode";
import EndTreeNode from "../models/data/EndTreeNode";
import MiddleTreeNode from "../models/data/MiddleTreeNode";


export default function Plot() {
    const { network, predictPoints } = useNetwork();
    const { plotData,classTreeData, generateData, dataGenerated,classesColors } = usePlotData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (dataGenerated) {
            renderWithData(ctx, canvas);
        } else {
            renderWithoutData(ctx, canvas);
        }
    }, [network, plotData, dataGenerated, classTreeData]);

    const renderWithoutData = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const renderSegment = (node: TreeNode) => {
            const colorMap: string[][] = [];
            if (node instanceof EndTreeNode) {
                for (let x = 0; x < width; x++) {
                    colorMap[x] = [];
                    for (let y = 0; y < height; y++) {
                        colorMap[x][y] = (node as EndTreeNode).value;
                    }
                }
                return colorMap;
            }
            const child1 = (node as MiddleTreeNode).next?.get(node.key + "0");
            const child2 = (node as MiddleTreeNode).next?.get(node.key + "1");

            if (!child1 || !child2) return [];
            const map1 = renderSegment(child1);
            const map2 = renderSegment(child2);

            for (let x = 0; x < width; x++) {
                colorMap[x] = []
                for (let y = 0; y < height; y++) {

                    if ((node as MiddleTreeNode).divider.evaluate(x - width/2, y - height /2)) {
                        colorMap[x][y] = map1[x][y];
                    }
                    else {
                        colorMap[x][y] = map2[x][y];
                    }
                }
            }
            return colorMap;
        };

        const colorMap = renderSegment(classTreeData.root);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const color = classesColors.get(colorMap[x][y]);
                ctx.fillStyle = color!;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        
        


    }

    const renderWithData = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const size = canvas.width;
        ctx.clearRect(0, 0, size, size);

        // Predictions
        const resolution = 2;
        for (let x = 0; x < size; x += resolution) {
            for (let y = 0; y < size; y += resolution) {
                const normX = (x / size) * 2 - 1;
                const normY = (y / size) * 2 - 1;
                const predictedClass = predictPoints([normX * 100, normY * 100]);
                ctx.fillStyle = predictedClass === 0 ? "rgba(173, 216, 230, 0.5)" : "rgba(255, 182, 193, 0.5)";
                ctx.fillRect(x, y, resolution, resolution);
            }
        }

        //Points
        plotData.points.forEach((point: Point) => {
            ctx.fillStyle = point.class === 0 ? "blue" : "red";
            ctx.beginPath();
            ctx.arc((point.x / 100 + 1) * size / 2, (point.y / 100 + 1) * size / 2, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        });
    }

    return (
        <div className= "border rounded-2xl shadow-md p-4 bg-gray-100">                                                                                             
            <canvas ref={canvasRef} width={700} height={700} className="bg-white-100" />
        </div>
    );
}
