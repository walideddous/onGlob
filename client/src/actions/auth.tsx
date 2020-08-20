import axios from 'axios';

import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import setAuthToken from './../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }: any) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (ex) {
    dispatch(setAlert(ex.response.data, 'danger'));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const loginUser = ({ email, password }: any) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  });
};
