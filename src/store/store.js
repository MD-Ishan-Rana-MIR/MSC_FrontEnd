import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "@/redux/auth-api/authApi";
import { categorySlice } from "@/redux/admin/category/categoryApi";
import { brandSlice } from "@/redux/admin/brand/brandApi";

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [categorySlice.reducerPath]: categorySlice.reducer,
        [brandSlice.reducerPath]: brandSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware, categorySlice.middleware, brandSlice.middleware),
});
