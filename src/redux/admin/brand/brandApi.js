import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApiSlice = createApi({
  reducerPath: "brandApi",
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
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    // Get All Brands
    getAllBrands: builder.query({
      query: () => `all-brands`,
      providesTags: ["Brand"],
    }),

    // Add Brand
    addBrand: builder.mutation({
      query: (payload) => ({
        url: `create-brand`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Update Brand
    updateBrand: builder.mutation({
      query: ({ id, payload }) => ({
        url: `brand-update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Delete Brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brand-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
