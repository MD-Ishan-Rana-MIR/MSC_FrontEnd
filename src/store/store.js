import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "@/redux/auth-api/authApi";
import { categorySlice } from "@/redux/admin/category/categoryApi";
import { brandApiSlice } from "@/redux/admin/brand/brandApi";
import { productApiSlice } from "@/redux/admin/product/productApi";
import { blogApi } from "@/redux/admin/blog/blogApi";
import { emailApi } from "@/redux/admin/email/emailApi";




export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [categorySlice.reducerPath]: categorySlice.reducer,
        [brandApiSlice.reducerPath]: brandApiSlice.reducer,
        [productApiSlice.reducerPath] : productApiSlice.reducer,
        [blogApi.reducerPath] : blogApi.reducer,
        [emailApi.reducerPath] : emailApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware, categorySlice.middleware, brandApiSlice.middleware, productApiSlice.middleware, blogApi.middleware,emailApi.middleware ),

});
