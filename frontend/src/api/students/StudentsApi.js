import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => "allStudents",
    }),
    getAllPrefects: builder.query({
      query: () => "allprefects",
    }),
    getAllPrimary: builder.query({
      query: () => "allPrimary",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllStudentsQuery,
  useGetAllPrefectsQuery,
  useGetAllPrimaryQuery,
} = studentsApi;
