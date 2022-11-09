import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createNewSchool = createAsyncThunk(
  "create/createNewSchool",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/createSchool`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        }
      );

      const data = await response.json();

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
  currentSchool: null,
  isCreating: false,
  error: "",
};

const createSchoolSlice = createSlice({
  name: "create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSchool.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createNewSchool.fulfilled, (state, action) => {
        state.isCreating = false;
        state.currentSchool = action.payload;
      })
      .addCase(createNewSchool.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      });
  },
});

export default createSchoolSlice.reducer;
