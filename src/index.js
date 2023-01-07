import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./createGlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobalStyle>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GlobalStyle>
);

reportWebVitals();
