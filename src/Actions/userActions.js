import axios from "axios";
import {
  getUserCFailure,
  getUserCStart,
  getUserCSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "../Redux/reducers/userSlice";

import { server } from "../Redux/store";

const token = localStorage.getItem("token");

export const fetchLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },

        withCredentials: true,
      }
    );

    await dispatch(loginSuccess(data));

    await localStorage.setItem("token", data.token);

    window.location.reload();
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};
export const registerUser =
  (firstname, lastname, email, password) => async (dispatch) => {
    try {
      dispatch(registerStart());

      const { data } = await axios.post(
        `${server}/register`,
        { firstname, lastname, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },

          withCredentials: true,
        }
      );

      await dispatch(registerSuccess(data));
      await localStorage.setItem("token", data.token);
      window.location.reload();
    } catch (error) {
      dispatch(registerFailure(error.response.data.message));
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutStart());

    localStorage.setItem("token", null);

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure());
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(getUserStart());

    const { data } = await axios.get(`${server}/me`, {
      headers: {
        token: token,
      },

      withCredentials: true,
    });

    dispatch(getUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getUserFailure());
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersStart());

    const { data } = await axios.get(`${server}/users`, {
      headers: {
        token: token,
      },

      withCredentials: true,
    });

    dispatch(getUsersSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getUsersFailure());
  }
};

export const fetchme = () => async (dispatch) => {
  try {
    dispatch(getUserCStart());

    const { data } = await axios.get(`${server}/mycourse`, {
      headers: {
        token: token,
      },

      withCredentials: true,
    });

    dispatch(getUserCSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getUserCFailure());
  }
};
