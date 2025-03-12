import React, { useState, useEffect } from "react";
import "./styles/main.css";

const DragAndDropExample = () => {
    const [containers, setContainers] = useState(["1", "2", "3"]);
    const [circles, setCircles] = useState([
        { id: "1", color: "orange", container: "1" },
        { id: "2", color: "orange", container: "1" },
        { id: "3", color: "orange", container: "2" },
        { id: "4", color: "orange", container: "3" },
        { id: "5", color: "orange", container: "3" },
        { id: "spawn", color: "orange", container: null },
    ]);
    const [nextId, setNextId] = useState(6);
    let draggedCircle = null;

    const spawnCircle = () => {
        setCircles([...circles, { id: nextId.toString(), color: "orange", container: null }]);
        setNextId(nextId + 1);
    };

    const removeCircle = (id) => {
        setCircles((prevCircles) => {
            const updatedCircles = prevCircles.filter(circle => circle.id !== id);
            checkEmptyContainers(updatedCircles);
            return updatedCircles;
        });
    };

    const moveCircle = (circleId, newContainerId) => {
        if (newContainerId === containers[0] || newContainerId === containers[containers.length - 1]) return;


        setCircles((prevCircles) => {
            const updatedCircles = prevCircles.map(circle =>
                circle.id === circleId ? { ...circle, container: newContainerId } : circle
            );
            checkEmptyContainers(updatedCircles);
            return updatedCircles;
        });
    };

    const addContainer = () => {
        if (containers.length >= 6) return;
        setContainers([...containers.slice(0, -1), (containers.length + 1).toString(), containers[containers.length - 1]]);
    };

    const checkEmptyContainers = (updatedCircles) => {
        setContainers((prevContainers) =>
            prevContainers.filter((containerId, index) =>
                (index === 0 || index === prevContainers.length - 1) ||
                updatedCircles.some(circle => circle.container === containerId)
            )
        );
    };

    useEffect(() => {
        if (!circles.some(circle => circle.container === null)) {
            spawnCircle();
        }
    }, [circles]);

    return (
        <div className="drag-drop-container">
            <h1>Native Drag & Drop Circles</h1>
            <button className="add-container-button" onClick={addContainer}>Add Container</button>

            <h2>Spawner (Always One Active Circle)</h2>
            <div className="spawner">
                {circles.filter(c => c.container === null).slice(0, 1).map(circle => (
                    <div
                        key={circle.id}
                        draggable
                        onDragStart={() => draggedCircle = circle.id}
                        className="circle"
                        style={{ backgroundColor: circle.color }}
                    />
                ))}
            </div>

            <h2>Delete Area</h2>
            <div
                className="delete-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => removeCircle(draggedCircle)}
            >
                Delete Here
            </div>

            <h2>Containers</h2>
            <div className="container-wrapper">
                {containers.map((id) => (
                    <div
                        key={id}
                        className="container"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => moveCircle(draggedCircle, id)}
                    >
                        {circles.filter(c => c.container === id).map(circle => (
                            <div
                                key={circle.id}
                                draggable
                                onDragStart={() => draggedCircle = circle.id}
                                className="circle"
                                style={{ backgroundColor: circle.color }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDropExample; 
