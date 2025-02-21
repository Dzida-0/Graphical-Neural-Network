import React from "react";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Line,
} from "recharts";

// Define your data points
const dataPoints = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 },
];

// Define your equation line
// In this case, we're plotting y = 2x (feel free to adjust it)
const equationLine = Array.from({ length: 6 }, (_, i) => ({
    x: i,
    y: 2 * i,
}));

const GraphPlot = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
                {/* Add grid */}
                <CartesianGrid />
                {/* Add axes */}
                <XAxis
                    type="number"
                    dataKey="x"
                    name="X-Value"
                    label={{ value: "X-Axis", position: "insideBottomRight", offset: -10 }}
                />
                <YAxis
                    type="number"
                    dataKey="y"
                    name="Y-Value"
                    label={{ value: "Y-Axis", angle: -90, position: "insideLeft" }}
                />
                {/* Tooltip for interactivity */}
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                {/* Plot data points */}
                <Scatter name="Data Points" data={dataPoints} fill="#8884d8" />
                {/* Add the equation line */}
                <Line
                    type="monotone"
                    dataKey="y"
                    data={equationLine}
                    stroke="#82ca9d"
                    dot={false}
                    name="Equation Line (y = 2x)"
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default GraphPlot;
