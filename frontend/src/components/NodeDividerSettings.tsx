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

export default function NodeDividerSettings({ dividerKey }: { dividerKey: string }) {
    const { changeDivider, getDivider } = usePlotData();
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        const divider = getDivider(dividerKey);

        if (divider instanceof LinearDivider) setSelected("ax+b");
        else if (divider instanceof SinDivider) setSelected("sin(x)");
        else if (divider instanceof SquaredDivider) setSelected("x^2");
        else if (divider instanceof CubedDivider) setSelected("x^3");
        else if (divider instanceof VerdicalDivider) setSelected("ver");
    }, [dividerKey, getDivider]);
    

    const changeDividerClass = (label : string) => {
        setSelected(label);
        switch (label) {
            case "ax+b":
                changeDivider(dividerKey, new LinearDivider());
                break;
            case "sin(x)":
                changeDivider(dividerKey, new SinDivider());
                break;
            case "x^2":
                changeDivider(dividerKey, new SquaredDivider());
                break;
            case "x^3":
                changeDivider(dividerKey, new CubedDivider());
                break;
            case "ver":
                changeDivider(dividerKey, new VerdicalDivider());
                break;
        }
    }

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
                            onChange={() => changeDividerClass(label)}
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
                    <SinSettings dividerKey={dividerKey} />// <SinSettings />
                )}
                {selected === "x^2" && (
                    <SqueredSettings dividerKey={dividerKey} />// <QuadraticSettings />
                )}
                {selected === "x^3" && (
                    <CubedSettings dividerKey={dividerKey} />// <CubicSettings />
                )}
                {selected === "ver" && (
                    <VerdicalSettings dividerKey={dividerKey} />//  <VerticalSettings />
                )}
            </div>
        </div>
    );
}
