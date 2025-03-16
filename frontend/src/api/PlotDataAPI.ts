const API_URL = "http://localhost:5001";

import PlotData from "./../models/PlotData";

export const PlotAPI = async (task: string, pageKey: number, method: string): Promise<PlotData> => {
    try {
        const response = await fetch(`${API_URL}/api/plot/${task}`, {
            method: method, 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pageId: pageKey,
                pointCount: 200,
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return Object.assign(new PlotData(), data);
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error; 
    }
};
