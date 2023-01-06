import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["students"],
  endpoints: (builder) => ({
    getStudentDetails: builder.query({
      query: (id) => ({ url: `user/${id}/` }),
      providesTags: ["students"],
    }),
    findAllStudents: builder.query({
      query: () => "findallstudents",
      providesTags: ["students"],
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
      invalidatesTags: ["students"],
    }),
    removeStudent: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["students"],
    }),
    updateStudentProfilePicture: builder.mutation({
      query: (payload) => ({
        url: `/user/clc50zmgc0000udtsba9swsoz`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),
    updateStudentStage: builder.mutation({
      query: (payload) => ({
        url: `/updateStage/${payload.studentId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),
    updateStudentGuardian: builder.mutation({
      query: (payload) => ({
        url: `/guardianUpdate/${payload.studentId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),
    updateUserAddress: builder.mutation({
      query: (payload) => ({
        url: `/userAddress/${payload.studentId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),
    addGuardian: builder.mutation({
      query: (payload) => ({
        url: "/studentGuardian",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetStudentDetailsQuery,
  useAddGuardianMutation, useUpdateStudentProfilePictureMutation,
  useUpdateStudentGuardianMutation,
  useUpdateUserAddressMutation,
  useFindAllStudentsQuery,
  useCountAllStudentsQuery,
  useGetAllPrefectsQuery,
  useGetAllPrimaryQuery,
  useGetAllJHSQuery,
  useAddStudentMutation,
  useUpdateStudentStageMutation,
  useRemoveStudentMutation,
} = studentsApi;
