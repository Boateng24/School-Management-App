import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const studentLogin = createAsyncThunk(
  "login/studentLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/login", {
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
  loggedInStudent: null,
  isLoggingIn: false,
  errorMessage: null,
};
const studentLoginSlice = createSlice({
  name: " login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentLogin.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.loggedInStudent = action.payload;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.errorMessage = action.payload;
      });
  },
});

export default studentLoginSlice.reducer;
