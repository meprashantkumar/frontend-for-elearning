import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    course1: null,
    acourses: null,
    lectures: null,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    getCourseStart: (state) => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload.courses;
    },
    getCourseFailure: (state, action) => {
      state.loading = false;
      state.courses = null;
    },
    getAdminCourseStart: (state) => {
      state.loading = true;
    },
    getAdminCourseSuccess: (state, action) => {
      state.loading = false;
      state.acourses = action.payload.courses;
    },
    getAdminCourseFailure: (state, action) => {
      state.loading = false;
      state.acourses = null;
    },
    getSingleCourseStart: (state) => {
      state.loading = true;
    },
    getSingleCourseSuccess: (state, action) => {
      state.loading = false;
      state.course1 = action.payload.course;
    },
    getSingleCourseFailure: (state, action) => {
      state.loading = false;
      state.course1 = null;
    },
    getLecturesStart: (state) => {
      state.loading = true;
    },
    getLecturesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload.lectures;
    },
    getLecturesFailure: (state, action) => {
      state.loading = false;
      state.lectures = null;
    },
    createCourseRequest: (state) => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
  getCourseStart,
  getCourseFailure,
  getCourseSuccess,
  getSingleCourseStart,
  getSingleCourseSuccess,
  getSingleCourseFailure,
  getLecturesFailure,
  getLecturesStart,
  getLecturesSuccess,
  getAdminCourseStart,
  getAdminCourseSuccess,
  getAdminCourseFailure,
  createCourseFail,
  createCourseRequest,
  createCourseSuccess,
  clearErrors,
  clearMessage,
} = courseSlice.actions;

export default courseSlice.reducer;
