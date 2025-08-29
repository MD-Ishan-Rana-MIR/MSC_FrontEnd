import React from "react";  // <-- Add this
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/page/website/home-page/HomePage";
import ProductListings from "@/page/website/productsPage/productListings/ProductListings";
import AboutPage from "@/page/website/about-page/AboutPage";
import ContactPage from "@/page/website/contact-page/ContactPage";
import ProductDetails from "@/page/website/productDetails/ProductDetails";
import ProductDetailsPage from "@/page/website/productDetails/ProductDetailsPage";
import AuthPage from "@/page/website/login-page/AuthPage";
import AdminLayout from "@/layout/AdminLayout";
import Wishlist from "@/page/website/wishlist/Wishlist";

export const MainRouter = createBrowserRouter([
    // main website routes
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
                path: "products/:id",
                element: <ProductDetailsPage />
            },
            {
                path: "/about",
                element: <AboutPage></AboutPage>
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/wishlist",
                element: <Wishlist />
            }
        ],

    },
    {
        path: "/auth",
        element: <AuthPage />
    },
    // admin dashboard routes
    {
        path: "/dashboard",
        element: <AdminLayout />
    }




]);
