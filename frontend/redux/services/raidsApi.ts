import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:5000/api" : "/api"

type Raid = {
  name: string;
  date: string;
  people: Array<string>;
  drops: Array<string>;
};

type RaidsResponse = {
    raids: Array<Raid>;
};

export const raidsApi = createApi({
  reducerPath: "raidsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Raid"],
  endpoints: (builder) => ({
    getRaids: builder.query<Raid[], null>({
      query: () => "raids",
      transformResponse: (response: RaidsResponse) => response.raids,
      providesTags: ["Raid"],
    }),
    addNewRaid: builder.mutation({
        query: (payload) => ({
            url: 'raids',
            method: "POST",
            body: payload,
            header: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }),
        invalidatesTags: ["Raid"],
    }),
  }),
});

export const { useGetRaidsQuery, useAddNewRaidMutation } = raidsApi;
