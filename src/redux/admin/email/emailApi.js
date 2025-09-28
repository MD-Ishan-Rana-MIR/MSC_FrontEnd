import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emailApi = createApi({
  reducerPath: "emailApi",

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

  tagTypes: ["email"],

  endpoints: (builder) => ({
    sendEmailApi : builder.mutation({
        query : (payload)=>({
            url : `user-send-email`,
            method : "POST",
            body : payload
        })
    }),
    allSubscriberApi : builder.query({
        query : ()=>({
            url : `all-subcriber`,
            method : "GET"
        })
    })
  }),
});

export const { useSendEmailApiMutation,useAllSubscriberApiQuery } = emailApi;
