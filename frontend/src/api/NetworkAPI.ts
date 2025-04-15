const API_URL = "http://localhost:5001";

export const updateNetwork = async (task: string, PageId: number, Data: object) => {
    try {

        await fetch(`${API_URL}/network/${task}`, {
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
        console.error("Failed to update network:", error);
    }
};

export const getNetwork = async (pageKey: number) => {
    try {
        const response = await fetch(`${API_URL}/network/${pageKey}`);
        if (!response.ok) {
            throw new Error("Failed to fetch network.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching network:", error);
        return null;
    }
};