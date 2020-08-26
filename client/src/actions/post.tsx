import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch: any) => {
  try {
    const res = await axios.get('/api/v1/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.put('/api/v1/posts/likes/' + id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.put('/api/v1/posts/unlikes/' + id);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id: any) => async (dispatch: any) => {
  try {
    await axios.delete('/api/v1/posts/' + id);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPosts = (text: any) => async (dispatch: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    const res = await axios.post('/api/v1/posts', text, config);

    dispatch({
      type: ADD_POSTS,
      payload: res.data.data,
    });

    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (id: any) => async (dispatch: any) => {
  try {
    const res = await axios.get('/api/v1/posts/' + id);

    dispatch({
      type: GET_POST,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add comment
export const addComment = (postId: any, formData: any) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'Application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/v1/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};

//Delete comment
export const deleteComment = (postId: any, commentId: any) => async (
  dispatch: any
) => {
  try {
    axios.delete(`/api/v1/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Deleted', 'success'));
  } catch (ex) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: ex.response.statusText, status: ex.response.status },
    });
  }
};
