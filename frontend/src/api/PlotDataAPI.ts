const API_URL = "http://localhost:5110";

export const changeData = async (task: string, pageKey: number, data: number) => {
    try {
        await fetch(`${API_URL}/${pageKey}/${task}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error("Failed to change data:", error);
    }
};