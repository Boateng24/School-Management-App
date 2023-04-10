import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const schoolResetPassword = createAsyncThunk(
  "resetpassword/schoolResetPassword",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/schoolresetPassword",
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

const schoolResetPasswordSlice = createSlice({
  name: "auth/resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schoolResetPassword.pending, (state) => {
        state.isLoggingIn = true;
        state.error = "";
      })
      .addCase(schoolResetPassword.fulfilled, (state, action) => {
        const { loggedInSchool } = action.payload;
        state.isLoggingIn = false;
        state.loggedInSchool = action.payload;
        state.error = "";
      })
      .addCase(schoolResetPassword.rejected, (state, action) => {
        const { message } = action.payload;
        state.isLoggingIn = false;
        state.error = "Passwords do not match";
      });
  },
});

export default schoolResetPasswordSlice.reducer;
