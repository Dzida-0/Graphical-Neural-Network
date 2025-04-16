import { useState } from "react";
import { usePlotData } from "../context/PlotDataContext";
import MiddleTreeNode from "../models/data/MiddleTreeNode";
import SinDivider from "../models/data/SinDivider";

export default function SinSettings({ dividerKey }: { dividerKey: string }) {
    const [, forceUpdate] = useState<number>(0);
    const { classTreeData, changeDivider } = usePlotData();
    const divider = (classTreeData.getNodeByKey(dividerKey) as MiddleTreeNode).divider;
    return (
        <div className="space-y-2">
            <div>
                <label className="block">deg (angle): {divider.deg}°</label>
                <input
                    id="deg"
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={divider.deg}
                    onChange={(e) => { divider.deg = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>
            <div>
                <label className="block">shift x: {divider.shiftX}</label>
                <input
                    id="shiftX"
                    type="range"
                    min={-10}
                    max={10}
                    step={0.1}
                    value={divider.shiftX}
                    onChange={(e) => { divider.shiftX = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>
            <div>
                <label className="block">shift y: {divider.shiftY}</label>
                <input
                    id="shiftY"
                    type="range"
                    min={-10}
                    max={10}
                    step={0.1}
                    value={divider.shiftY}
                    onChange={(e) => { divider.shiftY = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>

            <div>
                <label className="block">amplitude: {(divider as SinDivider).amplitude}</label>
                <input
                    id="amplitude"
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={(divider as SinDivider).amplitude}
                    onChange={(e) => {(divider as SinDivider).amplitude = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>
            <div>
                <label className="block">wavelength: {(divider as SinDivider).wavelength}</label>
                <input
                    id="wavelength"
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={(divider as SinDivider).wavelength}
                    onChange={(e) => { (divider as SinDivider).wavelength = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>

        </div>
    );
}
