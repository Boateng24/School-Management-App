import { configureStore } from "@reduxjs/toolkit";
import schoolRegistrationSlice from "../../features/auth/schoolRegistrationSlice";
import studentLoginSlice from "../../features/auth/studentLoginSlice";

const store = configureStore({
  reducer: {
    schoolRegistration: schoolRegistrationSlice,
    studentLogin: studentLoginSlice,
  },
});

export default store;
