import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logoutSchool = createAsyncThunk(
  "auth/logoutSchool",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/schoolLogout",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Accept: "Application/json",
            Authorization: "Token " + token,
          },
          body: JSON.stringify(token),
        }
      );

      const data = await response.json();

      if (response.status === 204) {
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
  currentSchool: null,
  isLoggingOut: false,
  error: "",
};

const logoutSchoolSlice = createSlice({
  name: "auth/logout",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentSchool = null;
      state.isLoggingOut = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutSchool.pending, (state, action) => {
        state.isLoggingOut = true;
      })
      .addCase(logoutSchool.fulfilled, (state, action) => {
        state.isLoggingOut = false;
        state.currentSchool = null;
      })
      .addCase(logoutSchool.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = logoutSchoolSlice.actions;
export default logoutSchoolSlice.reducer;
