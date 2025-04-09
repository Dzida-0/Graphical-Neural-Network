import { useRef, useEffect } from "react";

const CanvasShapes = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        const scaleX = 50;
        const scaleY = 50;

        for (let px = 0; px < width; px++) {
            for (let py = 0; py < height; py++) {
                const x = (px - width / 2) / scaleX;
                const y = (height / 2 - py) / scaleY;

                const inequality1 = Math.sin(x) + x > y;
                const inequality2 = -Math.pow(x, 3) > y ;
                const inequality3 = px - 50 > py;

                if (inequality1) ctx.fillStyle = "lightblue";
                else if (inequality2) ctx.fillStyle = "lightgreen";
                else if (inequality3) ctx.fillStyle = "lightcoral";
                else  ctx.fillStyle = "yellow";

                ctx.fillRect(px, py, 1, 1);
            }
        }
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} style={{ border: "1px solid black" }}></canvas>;
};

export default CanvasShapes;
