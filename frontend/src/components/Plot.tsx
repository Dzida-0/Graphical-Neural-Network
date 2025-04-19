import { useEffect, useRef } from "react";
import { useNetwork } from "./../context/NetworkContext";
import { usePlotData } from "./../context/PlotDataContext";
import Point from "./../models/data/Point";
import TreeNode from "./../models/data/TreeNode";
import EndTreeNode from "../models/data/EndTreeNode";
import MiddleTreeNode from "../models/data/MiddleTreeNode";


export default function Plot() {
    const { network, predictPoints } = useNetwork();
    const { plotData,classTreeData, dataGenerated,classesColors } = usePlotData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        render();
    }, [network, plotData, dataGenerated, classTreeData]);

    // Resize
    useEffect(() => {
        const observer = new ResizeObserver(render);
        if (containerRef.current) observer.observe(containerRef.current);
        render();
        return () => observer.disconnect();
    }, []);


    const render = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const { width, height } = canvas.getBoundingClientRect();
        const scale = window.devicePixelRatio || 1;
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);

        if (dataGenerated) {
            renderWithData(ctx, canvas);
        } else {
            renderWithoutData(ctx, canvas);
        }
    };

    const renderWithoutData = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Logical coordinate system
        const minX = -10;
        const maxX = 10;
        const minY = -10;
        const maxY = 10;
        const resolution = 200;

        // Grid cell size in pixels
        const cellWidth = width / resolution;
        const cellHeight = height / resolution;

        // Coordinate mapping
        const toCanvasX = (x: number) => ((x - minX) / (maxX - minX)) * width;
        const toCanvasY = (y: number) => ((y - minY) / (maxY - minY)) * height;

        // Tree evaluation
        const evaluateClassAt = (x: number, y: number, node: TreeNode): string => {
            if (node instanceof EndTreeNode) {
                return node.value;
            }

            const middle = node as MiddleTreeNode;
            const result = middle.divider.evaluate(x, y);
            const nextKey = middle.key + (result ? "0" : "1");
            const next = middle.next?.get(nextKey);

            if (!next) return "";
            return evaluateClassAt(x, y, next);
        };

        // Render grid
        for (let i = 0; i < resolution; i++) {
            const x = minX + ((maxX - minX) * i) / (resolution - 1);
            for (let j = 0; j < resolution; j++) {
                const y = minY + ((maxY - minY) * j) / (resolution - 1);

                const classId = evaluateClassAt(x, y, classTreeData.root);
                const color = classesColors.get(classId);
                if (!color) continue;

                ctx.fillStyle = color;

                const px = Math.floor(toCanvasX(x));
                const py = Math.floor(toCanvasY(y));
                ctx.fillRect(px, py, Math.ceil(cellWidth), Math.ceil(cellHeight));
            }
        }
    };

    const renderWithData = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // render canvas with pionts and predicted classes
        const size = canvas.width;
        ctx.clearRect(0, 0, size, size);

        // Predictions
        const resolution = 2;
        for (let x = 0; x < size; x += resolution) {
            for (let y = 0; y < size; y += resolution) {
                const normX = (x / size) * 2 - 1;
                const normY = (y / size) * 2 - 1;
                const predictedClass = predictPoints([normX * 100, normY * 100]);
                switch (predictedClass) {
                    case 0:
                        ctx.fillStyle = "rgba(173, 216, 230, 0.5)"; // Blue
                        break;
                    case 1:
                        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Red
                        break;
                    case 2:
                        ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; // Green
                        break;
                    case 3:
                        ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow
                        break;
                    case 4:
                        ctx.fillStyle = "rgba(128, 0, 128, 0.5)"; // Purple
                        break;
                    default:
                        ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
                        break;
                }
                ctx.fillRect(x, y, resolution, resolution);
            }
        }

        //Points
        const pointRadius = Math.max(size * 0.007,3); // points scaling

        plotData.points.forEach((point: Point) => {
            switch (point.class) {
                case 0:
                    ctx.fillStyle = "blue";
                    break;
                case 1:
                    ctx.fillStyle = "red";
                    break;
                case 2:
                    ctx.fillStyle = "green";
                    break;
                case 3:
                    ctx.fillStyle = "yellow";
                    break;
                case 4:
                    ctx.fillStyle = "purple"; 
                    break;
                default:
                    ctx.fillStyle = "gray";
                    break;
            }
            ctx.beginPath();
            ctx.arc(
                (point.x / 100 + 1) * size / 2,
                (point.y / 100 + 1) * size / 2,
                pointRadius,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.stroke();
        });
    }



    return (
        <div ref={containerRef} className="border rounded-2xl shadow-md p-4 bg-gray-100 w-full">
            <div className="relative w-full aspect-square">
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>
        </div>
    );
}
