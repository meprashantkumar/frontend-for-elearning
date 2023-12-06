import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    users: null,
    usercourses: null,
    loading: false,
    message: null,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isLoggedIn = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    loginStart: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    logoutStart: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.me = null;
    },
    logoutFailure: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    },

    getUserStart: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
    },
    getUsersStart: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.isLoggedIn = true;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.users = null;
      state.isLoggedIn = false;
    },
    getUserCStart: (state) => {
      state.loading = true;
    },
    getUserCSuccess: (state, action) => {
      state.loading = false;
      state.usercourses = action.payload.usercourses;
    },
    getUserCFailure: (state, action) => {
      state.loading = false;
      state.usercourses = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  getUserCFailure,
  getUserCStart,
  getUserCSuccess,
  clearErrors,
  clearMessage,
} = loginSlice.actions;

export default loginSlice.reducer;
