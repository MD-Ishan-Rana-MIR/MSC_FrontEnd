import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "@/router/auth-api/authApi";

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware),
});
