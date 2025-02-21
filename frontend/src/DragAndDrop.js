import React, { useState, useEffect } from "react";
import "./styles/main.css";

const DragAndDropCircles = () => {
    const [circles, setCircles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5110/circle")
            .then((response) => response.json())
            .then((data) => setCircles(data))
            .catch((error) => console.error("Error fetching circles:", error));
    }, []);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("circleId", id);
    };

    const handleDrop = (e) => {
        const circleId = parseInt(e.dataTransfer.getData("circleId"), 10);
        const rect = e.target.getBoundingClientRect();
        const offsetX = ((e.clientX - rect.left) / rect.width) * 100; 
        const offsetY = ((e.clientY - rect.top) / rect.height) * 100; 


        setCircles((prev) =>
            prev.map((circle) =>
                circle.id === circleId
                    ? { ...circle, posX: offsetX, posY: offsetY }
                    : circle
            )
        );

        fetch(`http://localhost:5110/circle/${circleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ posX: offsetX, posY: offsetY}),
        }).catch((error) => console.error("Error updating circle:", error));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDeleteDrop = (e) => {
        const circleId = parseInt(e.dataTransfer.getData("circleId"), 10);
        setCircles((prev) => prev.filter((circle) => circle.id !== circleId));
        fetch(`http://localhost:5110/circle/${circleId}`, {
            method: "DELETE",
        }).catch((error) => console.error("Error deleting circle:", error));
    };

    return (
        <div id="drag-and-drop-box">
            {/* Drag Area */}

            <div
                className="drag-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {circles.map((circle) => (
                    <div
                        key={circle.id}
                        className="circle"
                        draggable={circle.layer > 0}
                        onDragStart={circle.layer > 0 ? (e) => handleDragStart(e, circle.id) : undefined}
                        style={{
                            top: `${circle.posY}%`,
                            left: `${circle.posX}%`
                        }}
                    ></div>
                ))}
            </div>

            {/* Delete Area */}
            <div
                className="delete-area"
                onDragOver={handleDragOver}
                onDrop={handleDeleteDrop}
            >
                Drag here to delete
            </div>
        </div>

    );
};

export default DragAndDropCircles;
