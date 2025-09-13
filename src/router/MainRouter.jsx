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
import RegistrationPage from "@/page/website/login-page/RegistrationPage";
import EmailVerify from "@/page/website/forgot-password/EmailVerify";
import OtpVerifyFrom from "@/page/website/forgot-password/OtpVerifyFrom";
import NewPasswordSet from "@/page/website/forgot-password/NewPasswordSet";
import PorfilePage from "@/page/website/profile-page/PorfilePage";
import UserProtectedRouter from "@/page/protected-route/UserProtectedRouter";
import CartPage from "@/page/website/cart-page/CartPage";
import WishList from "@/page/website/wish-page/WishList";
import ManageCategory from "@/page/admin/category/ManageCategory";
import AdminLogin from "@/page/admin/admin-login/AdminLogin";
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
            },
            {
                path : "/wishlist",
                element : <UserProtectedRouter><WishList></WishList></UserProtectedRouter>
            },
            {
                path: "/profile",
                element: <UserProtectedRouter><PorfilePage></PorfilePage></UserProtectedRouter>
            },
            {
                path : "/cart",
                element : <UserProtectedRouter><CartPage></CartPage> </UserProtectedRouter>
            }

        ],

    },
    {
        path: "/auth",
        element: <AuthPage />
    },
    {
        path: "/registration",
        element: <RegistrationPage />
    },


    // admin dashboard routes
    {
        path: "/dashboard",
        element: <AdminLayout />,
        children : [
            {
                path : "category-list",
                element : <ManageCategory></ManageCategory>
            }
        ]
    },
    {
        path: "/forgot-password",
        element: <EmailVerify></EmailVerify>
    },
    {
        path: "/otp-verify",
        element: <OtpVerifyFrom></OtpVerifyFrom>
    },
    {
        path: "/new-password-set",
        element: <NewPasswordSet></NewPasswordSet>
    },

    {
        path : "/admin-login",
        element : <AdminLogin></AdminLogin>
    }




]);
