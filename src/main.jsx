import React from "react"; // React 17+ এ না রাখলেও চলে
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MainRouter } from "./router/MainRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={MainRouter} />
    </Provider>
  </StrictMode>
);
