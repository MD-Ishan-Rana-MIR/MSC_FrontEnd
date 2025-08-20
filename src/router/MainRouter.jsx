import React from "react";  // <-- Add this
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/page/website/home-page/HomePage";
import ProductListings from "@/page/website/productsPage/productListings/ProductListings";
import AboutPage from "@/page/website/about-page/AboutPage";

export const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,

        children: [
            {
                index: true, // better than repeating "/"
                element: <HomePage></HomePage>,
            },
            {
                path: "products",
                element: <ProductListings />
            },
            {
                path: "/about",
                element: <AboutPage></AboutPage>
            }
        ],

    },

]);
