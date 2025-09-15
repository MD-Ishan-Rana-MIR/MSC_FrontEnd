import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "@/redux/auth-api/authApi";
import { categorySlice } from "@/redux/admin/category/categoryApi";
import { productApiSlice } from "@/redux/admin/product/productApi";
import { brandApiSlice } from "@/redux/admin/brand/brandApi";

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [categorySlice.reducerPath] : categorySlice.reducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        [brandApiSlice.reducerPath]: brandApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApiSlice.middleware,
            categorySlice.middleware,
            productApiSlice.middleware,
            brandApiSlice.middleware
        ),
});
