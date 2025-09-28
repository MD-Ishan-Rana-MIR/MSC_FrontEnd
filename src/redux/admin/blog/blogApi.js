import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASEURL,
        prepareHeaders: (headers) => {
            // get tokens dynamically
            const userToken = localStorage.getItem("user-token");
            const adminToken = localStorage.getItem("admin_token");
            console.log(adminToken)

            if (userToken) {
                headers.set("Authorization", `Bearer ${userToken}`);
            }

            if (adminToken) {
                headers.set("Authorization", `Bearer ${adminToken}`);
            }

            return headers;
        },
    }),
    tagTypes: ["blog"],
    endpoints: (builder) => ({
        createBlog: builder.mutation({
            query: (payload) => ({
                url: "blog-create",
                method: "POST",
                body: payload
            }),
            invalidatesTags : ["blog"]
        }),
        allBlog : builder.query({
            query : ()=>({
                url : "all-blog",
                method : "GET"
            }),
            providesTags : ["blog"]
        }),
        singleBlog : builder.query({
            query : (id)=>({
                url : `/blog-details/${id}`,
                method : "GET"
            }),
            providesTags : ["blog"]
        }),
        blogDelete : builder.mutation({
            query : (id)=>({
                url : `blog-delete/${id}`,
                method : "DELETE"
            }),
            invalidatesTags : ["blog"]
        }),

        blogUpdate : builder.mutation({
            query : ({id,payload})=>({
                url : `blog-update/${id}`,
                method : "PUT",
                body : payload
            }),
            invalidatesTags : ["blog"]
        })
    }),
});

export const { useCreateBlogMutation,useAllBlogQuery,useSingleBlogQuery ,useBlogDeleteMutation, useBlogUpdateMutation } = blogApi;
