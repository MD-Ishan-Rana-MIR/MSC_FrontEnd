import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "productApi",
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
  tagTypes: ["Product"], // ✅ added tags
  endpoints: (builder) => ({
    // ✅ Add Category
    addProduct: builder.mutation({
      query: (payload) => ({
        url: `product-upload`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Proeduct"], // refetch list after add
    }),

    singleProduct: builder.query({
      query: (id) => ({
        url: `single-product/${id}`,
        method: "GET"
      }),
      invalidatesTags : ["Product"]
    }),

    // ✅ Get All Categories
    allProduct: builder.query({
      query: () => `all-category`,
      providesTags: ["Product"], // attaches tag
    }),

    // ✅ Update Category
    updateCategory: builder.mutation({
      query: ({ id,payload }) => ({
        url: `category-update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Category"], // refetch list after update
    }),

    // ✅ Delete Category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category-deleete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"], // refetch list after delete
    }),
  }),
});

export const {
  useAddProductMutation,
  useSingleProductQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllProductQuery
  
} = productSlice;
