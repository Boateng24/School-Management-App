import { configureStore } from "@reduxjs/toolkit";
import createSchoolSlice from "../../features/auth/createSchoolSlice";
import logoutSchoolSlice from "../../features/auth/logoutSchoolSlice";
import loginSchoolSlice, {
  localStorageMiddleware,
  reHydrateStore,
} from "../../features/auth/loginSchoolSlice";
import { studentsApi } from "../../api/students/StudentsApi";
import { schoolApi } from "../../api/school/SchoolApi";
import loginUserSlice from "../../features/auth/loginUserSlice";

const store = configureStore({
  reducer: {
    createSchool: createSchoolSlice,
    loginSchool: loginSchoolSlice,
    logoutSchool: logoutSchoolSlice,
    loginUser: loginUserSlice,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
