import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import { BrowserRouter } from "react-router-dom";
import { CryptoContext } from "./CryptoContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <CryptoContext>
                <App />
            </CryptoContext>
        </BrowserRouter>
    </React.StrictMode>
);
