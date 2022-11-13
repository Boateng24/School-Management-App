import { configureStore } from "@reduxjs/toolkit";
import createSchoolSlice from "../../features/auth/createSchoolSlice";
import logoutSchoolSlice from "../../features/auth/logoutSchoolSlice";
import loginSchoolSlice, {
  localStorageMiddleware,
  reHydrateStore,
} from "../../features/auth/loginSchoolSlice";

const store = configureStore({
  reducer: {
    createSchool: createSchoolSlice,
    loginSchool: loginSchoolSlice,
    logoutSchool: logoutSchoolSlice,
  },
  // preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
