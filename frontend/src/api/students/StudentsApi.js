import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["students"],
  endpoints: (builder) => ({
    findAllStudents: builder.query({
      query: () => "findallstudents",
    }),
    countAllStudents: builder.query({
      query: () => "countallstudents",
    }),
    getAllPrefects: builder.query({
      query: () => "allprefects",
    }),
    getAllPrimary: builder.query({
      query: () => "allPrimary",
    }),
    getAllJHS: builder.query({
      query: () => "allJhs",
    }),
    addStudent: builder.mutation({
      query: (payload) => ({
        url: "usersignup",
        method: "POST",
        body: payload,
      }),
      removeStudent: builder.mutation({
        query: (payload) => ({
          url: `/user/${payload}`,
          method: "DELETE",
          body: payload,
        }),
        invalidatesTags: ["students"],
      }),
      editStudent: builder.mutation({
        query: (payload) => ({
          url: `/user/${payload}`,
          method: "PUT",
          body: payload,
        }),
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFindAllStudentsQuery,
  useCountAllStudentsQuery,
  useGetAllPrefectsQuery,
  useGetAllPrimaryQuery,
  useGetAllJHSQuery,
  useAddStudentMutation,
} = studentsApi;
