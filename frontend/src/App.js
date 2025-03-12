import React, { useState } from "react";
import About from "./About";
import PageSimpleNN from "./test/PageSimpleNN";

function App() {
    const [activeTab, setActiveTab] = useState("weather");

    const renderTab = () => {
        return <About />;
    };

    return (
        <div className="App">
            
            <div className="tab-content">{renderTab()}</div>
        </div>
    );
}

export default App;
