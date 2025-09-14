import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category"], // ✅ added tags
  endpoints: (builder) => ({
    // ✅ Add Category
    addCategory: builder.mutation({
      query: (payload) => ({
        url: `create-category`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"], // refetch list after add
    }),

    // ✅ Get All Categories
    getAllCategories: builder.query({
      query: () => `all-category`,
      providesTags: ["Category"], // attaches tag
    }),

    // ✅ Update Category
    updateCategory: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `update-category/${id}`,
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
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
