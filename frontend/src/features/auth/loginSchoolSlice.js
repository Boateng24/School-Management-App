import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const schoolLogin = createAsyncThunk(
  "login/schoolLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/schoolLogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      const data = response.json();
      console.log("Data", data);
      console.log("Data error", data?.message);

      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loggedInSchool: null,
  isLoggingIn: false,
  error: "",
};

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
  }
};

const loginSchoolSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schoolLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = "";
      })
      .addCase(schoolLogin.fulfilled, (state, action) => {
        const { loggedInSchool } = action.payload;
        state.isLoggingIn = false;
        state.loggedInSchool = action.payload;
        state.error = "";
      })
      .addCase(schoolLogin.rejected, (state, action) => {
        // const { message } = action.payload;
        state.isLoggingIn = false;
        state.error = "Invalid credentials";
      });
  },
});

export default loginSchoolSlice.reducer;
