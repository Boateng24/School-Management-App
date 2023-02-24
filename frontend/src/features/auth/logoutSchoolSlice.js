import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const logoutSchool = createAsyncThunk(
  "logout/logoutSchool",
  async (accessToken, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/schoolLogout`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + accessToken,
          },
        }
      );

      const data = await response.json();

      if (response.status === 204) {
        console.log("response", response);
        localStorage.clear("applicationState");
        // Cookies.remove("accessToken")
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// //MIDDLEWARE
// export const localStorageMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem("applicationState", JSON.stringify(getState()));
//     return result;
//   };
// };

// export const reHydrateStore = () => {
//   if (localStorage.getItem("applicationState") !== null) {
//     return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
//   }
// };

const initialState = {
  currentUser: {},
  isLoading: false,
  errorMessage: null,
};

const logoutSchoolSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentUser = null;
      state.isLoading = false;
      state.errorMessage = null;
      // localStorage.clear("applicationState");
      // localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutSchool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.accessToken = null;
        // localStorage.clear("applicationState");
        // localStorage.clear();
      })
      .addCase(logoutSchool.rejected, (state, action) => {
        // const { non_field_errors } = action.payload;
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logout } = logoutSchoolSlice.actions;

export default logoutSchoolSlice.reducer;
