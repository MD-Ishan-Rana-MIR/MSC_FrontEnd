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
    // ✅ Add Brand
    addBrand: builder.mutation({
      query: (formData) => ({
        url: `brand-create`,   // keep consistent with your backend route
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // ✅ Single Brand
    singleBrand: builder.query({
      query: (id) => ({
        url: `single-brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    // ✅ Get All Brands
    getAllBrand: builder.query({
      query: () => `all-brand`, // adjust to your backend route
      providesTags: ["Brand"],
    }),

    // ✅ Update Brand
    updateBrand: builder.mutation({
      query: ({ id, payload }) => ({
        url: `brand-update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),

    // ✅ Delete Brand
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
  useAddBrandMutation,
  useSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetAllBrandQuery
} = brandApiSlice;
