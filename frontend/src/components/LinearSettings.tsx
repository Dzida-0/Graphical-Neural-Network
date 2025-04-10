import { useState } from "react";
import { usePlotData } from "../context/PlotDataContext";
import MiddleTreeNode from "../models/data/MiddleTreeNode";

export default function LinearSettings({ dividerKey }: { dividerKey: string }) {
    const [, forceUpdate] = useState<number>(0);
    const { classTreeData,changeDivider } = usePlotData();
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
                    onChange={(e) => { divider.changeDeg(parseFloat(e.target.value)); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>
            <div>
                <label className="block">b: {divider.b}</label>
                <input
                    id="b"
                    type="range"
                    min={-10}
                    max={10}
                    step={0.1}
                    value={divider.b}
                    onChange={(e) => { divider.changeShift(parseFloat(e.target.value)); changeDivider(dividerKey, divider); forceUpdate((n) => n + 1); }}
                />
            </div>
          
        </div>
    );
}
