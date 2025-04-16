import { useState } from "react";
import { usePlotData } from "../context/PlotDataContext";
import MiddleTreeNode from "../models/data/MiddleTreeNode";
import CubedDivider from "../models/data/CubedDivider";

export default function CubedSettings({ dividerKey }: { dividerKey: string }) {
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
                <label className="block">width: {(divider as CubedDivider).width}</label>
                <input
                    id="width"
                    type="range"
                    min={0.1}
                    max={2}
                    step={0.005}
                    value={(divider as CubedDivider).width}
                    onChange={(e) => { (divider as CubedDivider).width = parseFloat(e.target.value); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>


        </div>
    );
}
