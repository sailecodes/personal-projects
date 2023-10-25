import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./js/components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route
          path="/*"
          element={<App />}
        />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
