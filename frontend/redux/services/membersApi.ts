import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:5000/api" : "/api"

type RaidInfo = {
  id: string;
  name: string;
  date: string;
}

type Member = {
  name: string;
  raids: Array<RaidInfo>;
};

type MembersResponse = {
  members: Array<Member>;
};

export const membersApi = createApi({
  reducerPath: "membersApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getMembers: builder.query<Member[], null>({
      query: () => "members/v1",
      transformResponse: (response: MembersResponse) => response.members,
      providesTags: ["Member"],
    }),
    // addNewRaid: builder.mutation({
    //     query: (payload) => ({
    //         url: 'members/v1',
    //         method: "POST",
    //         body: payload,
    //         header: {
    //             "Content-type": "application/json; charset=UTF-8",
    //         }
    //     }),
    //     invalidatesTags: ["Member"],
    // }),
    // refreshRaids: builder.mutation({
    //   query: () => "members/v1",
    //   transformResponse: (response: MembersResponse) => response.raids,
    //   invalidatesTags: ["Member"],
    // }),
  }),
});

// export const { useGetRaidsQuery, useAddNewRaidMutation, useRefreshRaidsMutation } = raidsApi;
export const { useGetMembersQuery} = membersApi;
