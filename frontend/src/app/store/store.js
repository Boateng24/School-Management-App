import { configureStore } from "@reduxjs/toolkit";
import createSchoolSlice from "../../features/auth/createSchoolSlice";
import logoutSchoolSlice from "../../features/auth/logoutSchoolSlice";
import loginSchoolSlice, {
  localStorageMiddleware,
  reHydrateStore,
} from "../../features/auth/loginSchoolSlice";
import { studentsApi } from "../../api/students/StudentsApi";
import { adminApi } from "../../api/superadmin/SuperAdminApi";
import loginUserSlice from "../../features/auth/loginUserSlice";
import schoolForgotPasswordSlice  from "../../features/auth/forgotPasswordSlice";
import AdminLoginSlice from "../../features/auth/AdminLoginSlice";

const store = configureStore({
  reducer: {
    createSchool: createSchoolSlice,
    loginSchool: loginSchoolSlice,
    logoutSchool: logoutSchoolSlice,
    loginUser: loginUserSlice,
    schoolForgotPassword: schoolForgotPasswordSlice,
    superAdmin: AdminLoginSlice,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
