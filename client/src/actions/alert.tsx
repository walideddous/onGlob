import { v1 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg: any, alertType: any) => (dispatch: any) => {
  const id = uuid();
  const { error } = msg;
  dispatch({
    type: SET_ALERT,
    payload: { error, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
