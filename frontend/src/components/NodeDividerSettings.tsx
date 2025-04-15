import { useState } from "react";
import LinearSettings from "./LinearSettings"
import DataDivider from "../models/data/DataDivider";
import { usePlotData } from "../context/PlotDataContext";

export default function NodeDividerSettings({ dividerKey }: { dividerKey: string }) {
    const [selected, setSelected] = useState<string>("");
    const { changeDivider } = usePlotData();
    return (
        <div className="p-4 space-y-4 rounded-2xl shadow-md bg-gray-200 ">
            {/* Inline buttons */}
            <div className="flex space-x-2">
                {["ax+b", "sin(x)", "x^2", "x^3", "ver"].map((label) => (
                    <label
                        key={label}
                        className={`px-4 py-2 rounded cursor-pointer border 
                        ${selected === label ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                    >
                        <input
                            type="radio"
                            name="function"
                            value={label}
                            className="hidden"
                            checked={selected === label}
                            onChange={() => setSelected(label)}
                        />
                        {label}
                    </label>
                    
                ))}
            </div>

            {/* Sliders */}
            <div>
                {selected === "ax+b" && (
                    <LinearSettings dividerKey={dividerKey} />//
                    
                )}
                {selected === "sin(x)" && (
                    <LinearSettings dividerKey={dividerKey} />// <SinSettings />
                )}
                {selected === "x^2" && (
                    <LinearSettings dividerKey={dividerKey} />// <QuadraticSettings />
                )}
                {selected === "x^3" && (
                    <LinearSettings dividerKey={dividerKey} />// <CubicSettings />
                )}
                {selected === "ver" && (
                    <LinearSettings dividerKey={dividerKey} />//  <VerticalSettings />
                )}
            </div>
        </div>
    );
}
