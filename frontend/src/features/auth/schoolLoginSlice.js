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
const schoolLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schoolLogin.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(schoolLogin.fulfilled, (state, action) => {
        const { loggedInSchool } = action.payload;
        state.isLoggingIn = false;
        state.loggedInSchool = loggedInSchool;
      })
      .addCase(schoolLogin.rejected, (state, action) => {
        const { message } = action.payload;
        state.isLoggingIn = false;
        state.error = message;
      });
  },
});

export default schoolLoginSlice.reducer;
