import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: "school",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["school"],
  endpoints: (builder) => ({
    getAllSchools: builder.query({
      query: () => `allSchools`,
      providesTags: ["school"],
    }),
    getSchool: builder.query({
      query: () => `school`,
      providesTags: ["school"],
    }),
    removeSchool: builder.mutation({
      query: ({ id }) => ({
        url: `/school/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["school"],
    }),
    editSchool: builder.mutation({
      query: (payload) => ({
        url: `/school/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["school"],
    }),
  }),
});


export const {
  useGetAllSchoolsQuery,
  useGetSchoolQuery,
  useRemoveSchoolMutation,
  useEditSchoolMutation,
} = adminApi;
