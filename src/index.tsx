import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import StoreProvider from "./store/provider/StroreProvider";
import ErrorBoundary from "./utils/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    // <React.StrictMode>
    <ErrorBoundary>
        <StoreProvider>
            <App />
        </StoreProvider>
    </ErrorBoundary>
    // </React.StrictMode>
);
