import React from "react";  // <-- Add this
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, // better than repeating "/"
                element: <div>Home Page</div>,
            },
        ],
    },
]);
