import Axios from "axios";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const API_URL = import.meta.env.VITE_API_URL;
export const signup = (username, email, password) => async dispatch => {
    try {
      const response = await Axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      if (response.data.status) {
        dispatch({ type: SIGNUP_SUCCESS });
      } else {
        dispatch({ type: SIGNUP_FAILURE });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_FAILURE });
    }
  };
export const login = (email, password) => async dispatch => {
  try {
    const response = await Axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.status) {
      dispatch({ type: LOGIN_SUCCESS });
    } else {
      dispatch({ type: LOGIN_FAILURE });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logout = () => async dispatch => {
  try {
    const response = await Axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    if (response.data.status) {
      dispatch({ type: LOGOUT_SUCCESS });
    }
  } catch (error) {
    console.log(error);
  }
};