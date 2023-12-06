import axios from "axios";
import {
  getAdminCourseFailure,
  getAdminCourseStart,
  getAdminCourseSuccess,
  getCourseFailure,
  getCourseStart,
  getCourseSuccess,
  getLecturesFailure,
  getLecturesStart,
  getLecturesSuccess,
  getSingleCourseFailure,
  getSingleCourseStart,
  getSingleCourseSuccess,
} from "../Redux/reducers/courseSlice";
import { server } from "../Redux/store";

const token = localStorage.getItem("token");

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch(getCourseStart());

    const { data } = await axios.get(`${server}/courses`, {
      withCredentials: true,
    });

    dispatch(getCourseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getCourseFailure());
  }
};

export const fetchCourse1 = (id) => async (dispatch) => {
  try {
    dispatch(getSingleCourseStart());

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch(getSingleCourseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getSingleCourseFailure());
  }
};

export const fetchLectures = (id) => async (dispatch) => {
  try {
    dispatch(getLecturesStart());

    const { data } = await axios.get(`${server}/course/lectures/${id}`, {
      headers: {
        token: token,
      },
      withCredentials: true,
    });

    dispatch(getLecturesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getLecturesFailure());
  }
};

export const fetchAdminCourses = (id) => async (dispatch) => {
  try {
    dispatch(getAdminCourseStart());

    const { data } = await axios.get(`${server}/courses/admin`, {
      headers: {
        token: token,
      },
      withCredentials: true,
    });

    dispatch(getAdminCourseSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getAdminCourseFailure());
  }
};
