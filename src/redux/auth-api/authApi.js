import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASEURL,
        prepareHeaders: (headers) => {
            // get tokens dynamically
            const userToken = localStorage.getItem("user-token");
            const adminToken = localStorage.getItem("admin_token");

            if (userToken) {
                headers.set("Authorization", `Bearer ${userToken}`);
            }

            if (adminToken) {
                headers.set("admin-authorization", `Bearer ${adminToken}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
        }),
        addUser: builder.mutation({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
        }),
        // user registration 
        userRegistration: builder.mutation({
            query: (payload) => ({
                url: `user-registration`,
                method: "POST",
                body: payload
            })

        }),
        // user login 
        userLogin: builder.mutation({
            query: (payload) => ({
                url: `login`,
                method: "POST",
                body: payload
            })
        }),
        // email verify 
        userEmailVerify: builder.mutation({
            query: (payload) => ({
                url: `send-otp`,
                method: "POST",
                body: payload
            })
        }),
        userOtpVerify: builder.mutation({
            query: (payload) => ({
                url: `otp-verify`,
                method: "POST",
                body: payload
            })
        }),
        newPasswordSet: builder.mutation({
            query: (payload) => ({
                url: `reset-password`,
                method: "POST",
                body: payload

            })
        }),
        userProfile: builder.query({
            query: () => ({
                url: `user-profile`,
                method: "GET"
            })
        })
    }),
});

export const { useGetUsersQuery, useAddUserMutation, useUserLoginMutation, useUserRegistrationMutation, useUserEmailVerifyMutation, useUserOtpVerifyMutation, useNewPasswordSetMutation, useUserProfileQuery } = authApiSlice;
