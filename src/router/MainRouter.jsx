import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/page/website/home-page/HomePage";
import ProductListings from "@/page/website/productsPage/productListings/ProductListings";
import AboutPage from "@/page/website/about-page/AboutPage";
import ContactPage from "@/page/website/contact-page/ContactPage";
import ProductDetailsPage from "@/page/website/productDetails/ProductDetailsPage";
import AuthPage from "@/page/website/login-page/AuthPage";
import AdminLayout from "@/layout/AdminLayout";
import RegistrationPage from "@/page/website/login-page/RegistrationPage";
import EmailVerify from "@/page/website/forgot-password/EmailVerify";
import OtpVerifyFrom from "@/page/website/forgot-password/OtpVerifyFrom";
import NewPasswordSet from "@/page/website/forgot-password/NewPasswordSet";
import UserProtectedRouter from "@/page/protected-route/UserProtectedRouter";
import CartPage from "@/page/website/cart-page/CartPage";
import Wishlist from "@/page/website/wishlist/Wishlist"; // keep only one
import ManageCategory from "@/page/admin/category/ManageCategory";
import AdminLogin from "@/page/admin/admin-login/AdminLogin";
import AddCategoryPage from "@/page/admin/category/AddCategoryPage";
import CategoryUpdate from "@/page/admin/category/CategoryUpdate";
import ProfilePage from "@/page/website/profile-page/PorfilePage";

import AddBrand from "@/page/admin/brand/AddBrand";
import BrandListPage from "@/page/admin/brand/BrandListPage";
import BrandUpdate from "@/page/admin/brand/BrandUpdate";
import ProductList from "@/page/admin/product/ProductList";
import ProductUpload from "@/page/admin/product/ProductUpload";
=======
import AddProduct from "@/page/admin/product/AddProduct";


export const MainRouter = createBrowserRouter([
  // main website routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductListings />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "wishlist",
        element: (
          <UserProtectedRouter>
            <Wishlist />
          </UserProtectedRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <UserProtectedRouter>
            <ProfilePage />
          </UserProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <UserProtectedRouter>
            <CartPage />
          </UserProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },

  // admin dashboard routes
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      // category 
      {
        path: "category-list",
        element: <ManageCategory />,
      },
      {
        path: "add-category",
        element: <AddCategoryPage />,
      },
      {
        path: "category-update/:id",
        element: <CategoryUpdate />,
      },

      // brand
      {
        path : "brand-list",
        element : <BrandListPage></BrandListPage>
      },
      {
        path : "add-brand",
        element : <AddBrand></AddBrand>
      },
      {
        path : "brand-update/:id",
        element : <BrandUpdate></BrandUpdate>
      },
      // product 
      {
        path : "product-list",
        element : <ProductList></ProductList>
      },
      {
        path : "add-product",
        element : <ProductUpload></ProductUpload>

      {
        path: "add-product",
        element: <AddProduct />

      }
    ],
  },
  {
    path: "/forgot-password",
    element: <EmailVerify />,
  },
  {
    path: "/otp-verify",
    element: <OtpVerifyFrom />,
  },
  {
    path: "/new-password-set",
    element: <NewPasswordSet />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
]);
