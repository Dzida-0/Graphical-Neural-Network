import React, { useState, useEffect } from "react";

const WeatherForecast = () => {
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5110/weatherforecast")
            .then((response) => response.json())
            .then((data) => {
                setForecasts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Weather Forecast</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {forecasts.map((forecast, index) => (
                        <li key={index}>
                            <strong>Date:</strong> {forecast.date} |{" "}
                            <strong>TemperatureC:</strong> {forecast.temperatureC}°C |{" "}
                            <strong>Summary:</strong> {forecast.summary}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WeatherForecast;
