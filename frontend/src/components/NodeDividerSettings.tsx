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
                                onChange={() => changeDividerClass(label)}
                            />
                            {label}
                        </label>
                    ))}
                </div>

                {/* Sliders (Right Column) */}
                <div className="flex-1 p-2 rounded-xl bg-white shadow-inner">
                    {selected === "ax+b" && <LinearSettings dividerKey={dividerKey} />}
                    {selected === "sin(x)" && <SinSettings dividerKey={dividerKey} />}
                    {selected === "x^2" && <SqueredSettings dividerKey={dividerKey} />}
                    {selected === "x^3" && <CubedSettings dividerKey={dividerKey} />}
                    {selected === "ver" && <VerdicalSettings dividerKey={dividerKey} />}
                </div>

            </div>
        </div>

    );
}
