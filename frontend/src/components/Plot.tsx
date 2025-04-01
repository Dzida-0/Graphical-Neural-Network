import { useRef, useEffect } from "react";
import { useNetwork } from "./../context/NetworkContext";
import { usePlotData } from "./../context/PlotDataContext";
import Point from "../models/data/Point";

export default function Plot() {
    const { network, predictPoints } = useNetwork();
    const { plotData, generateData } = usePlotData();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = canvas.width;
        ctx.clearRect(0, 0, size, size);

        // Predictions
        const resolution = 2;
        for (let x = 0; x < size; x += resolution) {
            for (let y = 0; y < size; y += resolution) {
                const normX = (x / size) * 2 - 1;
                const normY = (y / size) * 2 - 1;
                const predictedClass = predictPoints([normX * 100, normY * 100 ]); 
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

    }, [network, plotData]);

    return (
        <div>
            <button
                onClick={() => generateData()}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Generate
            </button>
            <canvas ref={canvasRef} width={600} height={600} className="bg-gray-100" />
        </div>
    );
}
