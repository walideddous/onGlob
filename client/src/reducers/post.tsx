import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POSTS,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

interface initialSt {
  posts: [];
  post: { comments: [] };
  loading: Boolean;
  error: {};
}

const initialState: initialSt = {
  posts: [],
  post: { comments: [] },
  loading: true,
  error: {},
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POSTS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post: any) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== payload),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment: any) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
