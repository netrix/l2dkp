import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:5000/api" : "/api"

type Raid = {
  name: string;
  date: string;
  people: Array<string>;
  drops: Array<string>;
};

export const raidsApi = createApi({
  reducerPath: "raidsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getRaids: builder.query<Raid[], null>({
      query: () => "raids",
    }),
  }),
});

export const { useGetRaidsQuery } = raidsApi;
