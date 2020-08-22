import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch: any) => {
  try {
    const res = await axios.get('/api/v1/profiles/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create profile
export const createProfile = (
  formData: any,
  history: any,
  edit = false
) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/profiles', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience = (formData: any, history: any) => async (
  dispatch: any
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      '/api/v1/profiles/experience',
      formData,
      config
    );

    dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (ex) {
    const errors = ex.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};

export const addEducation = (formData: any, history: any) => async (
  dispatch: any
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/v1/profiles/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (ex) {
    const errors = ex.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};

//Delete Experience
export const deleteExperience = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.delete('/api/v1/profiles/experience/' + id);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};
//Delete Education
export const deleteEducation = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.delete('/api/v1/profiles/education/' + id);

    console.log(res.data.data.education);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch: any) => {
  try {
    if (window.confirm('Are you sure ? this can NOT be undone')) {
      await axios.delete('/api/v1/profiles');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Profile Removed', 'success'));
    }
  } catch (ex) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};
