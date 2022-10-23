import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerSchool = createAsyncThunk(
  "signUp/registerSchool",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      const data = await response.json();

      if (response.status === 201) {
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
  currentUser: null,
  isRegistering: false,
  errorMessage: "",
};
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerSchool.pending, (state) => {
        state.isRegistering = true;
      })
      .addCase(registerSchool.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.currentUser = action.payload;
      })
      .addCase(registerSchool.rejected, (state, action) => {
        state.isRegistering = false;
        state.errorMessage = action.payload;
      });
  },
});

export default signUpSlice.reducer;
