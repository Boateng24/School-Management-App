import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adminLogin = createAsyncThunk(
  "login/adminLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/superAdminLogin",
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
  loggedInAdmin: null,
  isLoggingIn: false,
  error: "",
};

export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    // cookies.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

export const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
  }
};

const AdminLoginSlice = createSlice({
  name: "admin/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = "";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.loggedInAdmin = action.payload;
        state.error = "";
      })
      .addCase(adminLogin.rejected, (state, {payload}) => {
        // const  {message}  = action.payload;
        state.isLoggingIn = false;
        state.error = "User does not exist" ;
      });
  },
});

export default AdminLoginSlice.reducer;
