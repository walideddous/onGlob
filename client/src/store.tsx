import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const Store = createStore(
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
