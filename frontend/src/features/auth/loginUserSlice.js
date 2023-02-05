import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const usersLogin = createAsyncThunk(
  "login/usersLogin",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/userlogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

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
  loggedInUser: null,
  isLoggingIn: false,
  error: "",
};

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

const loginUser = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = "";
      })
      .addCase(usersLogin.fulfilled, (state, action) => {
        const { loggedInUser } = action.payload;
        state.isLoggingIn = false;
        state.loggedInUser = action.payload;
        state.error = "";
      })
      .addCase(usersLogin.rejected, (state, action) => {
        // const { message } = action.payload;
        state.isLoggingIn = false;
        state.error = "Invalid credentials";
      });
  },
});

export default loginUser.reducer;
