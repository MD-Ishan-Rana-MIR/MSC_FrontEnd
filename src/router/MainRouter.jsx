import React from "react";  // <-- Add this
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/page/website/home-page/HomePage";

export const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, // better than repeating "/"
                element: <HomePage></HomePage>,
            },
        ],
    },
]);
