import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
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

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // ✅ Add Product
    addProduct: builder.mutation({
      query: (payload) => ({
        url: `product-upload`, // adjust to your backend route
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Get All Products
    getAllProducts: builder.query({
      query: () => `all-products`,
      providesTags: ["Product"],
    }),

    // ✅ Get Single Product
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // ✅ Update Product
    updateProduct: builder.mutation({
      query: ({ id, payload }) => ({
        url: `product-update/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
