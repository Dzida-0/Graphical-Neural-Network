import { useState } from "react";
import { useNetwork } from "../context/NetworkContext";
import { usePlotData } from "../context/PlotDataContext";
import PlotDragDropTree from "./../components/PlotDragDropTree" 
export default function PlotController() {
    const {network, updateClassCount } = useNetwork();
    const { generateData } = usePlotData();

    const maxPoints = 200;
    const [slider1, setSlider1] = useState(80);
    const [slider2, setSlider2] = useState(120);

    const handleDrag = (event: React.MouseEvent<HTMLDivElement>, isFirst: boolean) => {
        const rect = event.currentTarget.parentElement!.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newValue = Math.round((offsetX / rect.width) * maxPoints);

        if (isFirst) {
            setSlider1(Math.min(newValue, slider2 - 10));
        } else {
            setSlider2(Math.max(newValue, slider1 + 10));
        }
    };

    const handleClassesCountChange = (count: number) => {
        updateClassCount(count);
    };

    const handlePointsSpawn = (patern: number) => {
        generateData(patern);
    }

    return (
        <div className="m-10 bg-gray-100">
            <div className="flex items-center space-x-4 bg-white p-4 shadow-lg rounded-lg">
                <button id="decrease" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handleClassesCountChange(-1)} >⬅</button>
                <span id="counter" className="text-xl font-bold">{network.outputsNumber}</span>
                <button id="increase" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handleClassesCountChange(1)} >➡</button>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 shadow-lg rounded-lg">
                <button id="spaw-1" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handlePointsSpawn(1)} > s1 </button>
                <button id="spaw-2" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handlePointsSpawn(2)} > s2 </button>
                <button id="spaw-3" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handlePointsSpawn(3)} > s3 </button>
                <button id="spaw-4" className="p-2 bg-gray-300 rounded-full hover:bg-gray-400" onClick={() => handlePointsSpawn(4)} > s4 </button>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 shadow-lg rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Distribute {maxPoints} Points</h2>
                    <div className="relative w-full h-10 bg-gray-300 rounded-lg flex items-center">
                        <div
                            className="absolute bg-blue-500 h-full"
                            style={{ left: "0%", width: `${(slider1 / maxPoints) * 100}%` }}
                        ></div>
                        <div
                            className="absolute bg-green-500 h-full cursor-ew-resize"
                            style={{ left: `${(slider1 / maxPoints) * 100}%`, width: `${((slider2 - slider1) / maxPoints) * 100}%` }}
                            onMouseDown={(e) => handleDrag(e, true)}
                        ></div>
                        <div
                            className="absolute bg-red-500 h-full cursor-ew-resize"
                            style={{ left: `${(slider2 / maxPoints) * 100}%`, width: `${((maxPoints - slider2) / maxPoints) * 100}%` }}
                            onMouseDown={(e) => handleDrag(e, false)}
                        ></div>
                    </div>
                    <div className="mt-4 text-center">
                        <p>Class 1: {slider1} points</p>
                        <p>Class 2: {slider2 - slider1} points</p>
                        <p>Class 3: {maxPoints - slider2} points</p>
                    </div>
                </div>
            </div>
            <PlotDragDropTree/>
        </div>
    );
}