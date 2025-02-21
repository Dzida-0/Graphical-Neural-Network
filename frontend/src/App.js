import React, { useState } from "react";
import WeatherForecast from "./WeatherForecast";
import About from "./About";

function App() {
    const [activeTab, setActiveTab] = useState("weather");

    const renderTab = () => {
        if (activeTab === "weather") {
            return <WeatherForecast />;
        } else if (activeTab === "about") {
            return <About />;
        }
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <div className="tabs"> 
                <button
                    className={activeTab === "weather" ? "active" : ""}
                    onClick={() => setActiveTab("weather")}
                >
                    Weather Forecast
                </button>
                <button
                    className={activeTab === "about" ? "active" : ""}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>
            </div>
            <div className="tab-content">{renderTab()}</div>
        </div>
    );
}

export default App;
