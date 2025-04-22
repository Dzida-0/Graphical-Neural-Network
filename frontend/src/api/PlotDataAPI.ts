const API_URL = "http://localhost:5001";

export const updatePlot = async (task: string, PageId: number, Data: object) => {
    try {

        await fetch(`${API_URL}/plot/${task}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PageId,
                Data,
            }),
        });
    } catch (error) {
        console.error("Failed to update plot data:", error);
    }
};

export const getPlot = async (pageKey: number) => {
    try {
        const response = await fetch(`${API_URL}/plot/${pageKey}`);
        if (!response.ok) {
            throw new Error("Failed to fetch plot data.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching plot data:", error);
        return null;
    }
};