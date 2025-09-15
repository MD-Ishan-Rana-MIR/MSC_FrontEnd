import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandSlice = createApi({
  reducerPath: "BrandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASEURL,
    prepareHeaders: (headers) => {
      const adminToken = localStorage.getItem("admin_token");
      if (adminToken) {
        headers.set("Authorization", `Bearer ${adminToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Brand"], // ✅ added tags
  endpoints: (builder) => ({
    // ✅ Add Category
    addBrand: builder.mutation({
      query: (formData) => ({
        url: `brand-create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"], // refetch list after add
    }),

    singleBrand: builder.query({
      query: (id) => ({
        url: `single-brand/${id}`,
        method: "GET"
      }),
      invalidatesTags : ["Brand"]
    }),

    // ✅ Get All Categories
    getAlllBrand: builder.query({
      query: () => `all-brand`,
      providesTags: ["Brand"], // attaches tag
    }),

    // ✅ Update Category
    updateBrand: builder.mutation({
      query: ({ id,payload }) => ({
        url: `brand-update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Brand"], // refetch list after update
    }),

    // ✅ Delete Category
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brand-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"], // refetch list after delete
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetAlllBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useSingleBrandQuery
  
} = brandSlice;
