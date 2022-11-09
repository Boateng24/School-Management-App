import { configureStore } from "@reduxjs/toolkit";
import createSchoolSlice from "../../features/auth/createSchoolSlice";
import schoolLoginSlice from "../../features/auth/schoolLoginSlice";

const store = configureStore({
  reducer: {
    createSchool: createSchoolSlice,
    schoolLogin: schoolLoginSlice,
  },
});

export default store;
