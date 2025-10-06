import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoiceSlice = createApi({
    reducerPath: "invoiceApi",
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

        createInvoice : builder.mutation({
            query : ()=>({
                url : `/create-invoice`,
                method : "POST"
            })
        })
        
    }),
});

export const { useCreateInvoiceMutation  } = invoiceSlice;
