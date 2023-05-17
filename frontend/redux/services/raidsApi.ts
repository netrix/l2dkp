import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";


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
    baseUrl: "http://127.0.0.1:5000/api",
    // baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getRaids: builder.query<Raid[], null>({
      query: () => "raids",
    }),
  }),
});

export const { useGetRaidsQuery } = raidsApi;
