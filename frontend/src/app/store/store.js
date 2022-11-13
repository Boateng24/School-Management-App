import { configureStore } from "@reduxjs/toolkit";
import createSchoolSlice from "../../features/auth/createSchoolSlice";
import logoutSchoolSlice from "../../features/auth/logoutSchoolSlice";
import loginSchoolSlice, {
  localStorageMiddleware,
  reHydrateStore,
} from "../../features/auth/loginSchoolSlice";
import { studentsApi } from "../../api/students/StudentsApi";

const store = configureStore({
  reducer: {
    createSchool: createSchoolSlice,
    loginSchool: loginSchoolSlice,
    logoutSchool: logoutSchoolSlice,
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
