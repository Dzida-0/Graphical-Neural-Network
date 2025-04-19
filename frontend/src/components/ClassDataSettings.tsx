import { useState, useEffect } from "react";
import { usePlotData } from "../context/PlotDataContext";
//
import SinSettings from "./SinSettings";
import LinearSettings from "./LinearSettings"
import SqueredSettings from "./SqueredSettings"
import CubedSettings from "./CubedSettings"
import VerdicalSettings from "./VerdicalSettings"
//
import LinearDivider from "../models/data/LinearDivider";
import SinDivider from "../models/data/SinDivider";
import SquaredDivider from "../models/data/SqueredDivider";
import CubedDivider from "../models/data/CubedDivider";
import VerdicalDivider from "../models/data/VerdicalDivider";

export default function ClassDataSettings({ nodeKey }: { nodeKey: string }) {
    const { changeDivider, getDivider } = usePlotData();
    const [selected, setSelected] = useState<string>("");

    

    return (
        <div className="p-4 rounded-2xl shadow-md bg-gray-200">
            <div className="flex flex-row space-x-4">

                {/* Function Selector (Left Column) */}
                <div className="flex flex-col space-y-2">
                    {["ax+b", "sin(x)", "x^2", "x^3", "ver"].map((label) => (
                        <label
                            key={label}
                            className={`px-4 py-2 rounded-xl cursor-pointer border text-center transition
          ${selected === label ? "bg-gray-800 text-white" : "bg-gray-100 text-black hover:bg-gray-300"}`}
                        >
                            <input
                                type="radio"
                                name="function"
                                value={label}
                                className="hidden"
                                checked={selected === label}
                                
                            />
                            {nodeKey}
                        </label>
                    ))}
                </div>

              

            </div>
        </div>

    );
}
