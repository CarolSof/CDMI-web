import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.jsx";

import "./bootstrap.js";
import "./app.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


if (document.getElementById("root")) {
    const rootElement = ReactDOM.createRoot(document.getElementById("root"));
    rootElement.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
