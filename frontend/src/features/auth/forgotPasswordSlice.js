import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const schoolForgotPassword = createAsyncThunk(
  "forgotpassword/schoolForgotPassword",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/schoolforgotPassword",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        }
      );

      const data = response.json();

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


const schoolForgotPasswordSlice = createSlice({
  name: "auth/forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schoolForgotPassword.pending, (state) => {
        state.isLoggingIn = true;
        state.error = "";
      })
      .addCase(schoolForgotPassword.fulfilled, (state, action) => {
        const { loggedInSchool } = action.payload;
        state.isLoggingIn = false;
        state.loggedInSchool = action.payload;
        state.error = "";
      })
      .addCase(schoolForgotPassword.rejected, (state, action) => {
        const { message } = action.payload;
        state.isLoggingIn = false;
        state.error = "School not found";
      });
  },
});

export default schoolForgotPasswordSlice.reducer;
