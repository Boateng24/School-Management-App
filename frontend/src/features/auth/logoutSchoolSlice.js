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

      if (response.status === 200) {
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

// MIDDLEWARE
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
      console.log(state)
      state.currentUser.accessToken = null;
      localStorage.clear("applicationState");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutSchool.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutSchool.fulfilled, (state, action) => {
        state.isLoading = false;
        // Call the logout action to clear the authentication token and any other data from the store
        logoutSchoolSlice.caseReducers.logout(state, action);
      })
      .addCase(logoutSchool.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logout } = logoutSchoolSlice.actions;

export default logoutSchoolSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const logoutSchool = createAsyncThunk(
//   "logout/logoutSchool",
//   async () => {
//     try {
//     await fetch("http://localhost:5000/api/v1/schoolLogout" , {
//       method: 'DELETE'
//     });
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
//   }
// );

// const initialState =  {
//     loggedIn: false,
//     loading: false,
//     error: null,
//   }

// const logoutSchoolSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutSchool.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutSchool.fulfilled, (state) => {
//         state.loggedIn = false;
//         state.loading = false;
//       })
//       .addCase(logoutSchool.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       });
//   },
// });
// export const { logout } = logoutSchoolSlice.actions;

// export default logoutSchoolSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const logoutUser = createAsyncThunk("user/logoutUser", async () => {
//   try {
//     await axios.post("http://localhost:5000/api/v1/schoolLogout");
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// });

// const userSlice = createSlice({
//   name: "user",
//   initialState
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loggedIn = false;
//         state.loading = false;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       });
//   },
// });

// export const {} = userSlice.actions;

// export default userSlice.reducer;
