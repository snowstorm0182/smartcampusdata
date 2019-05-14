import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const initialState = {
  publications: [],
  labels: [],
  quotes: [],
  forums: [],
  todos: [],
  sections: [],
  //live only
  visibility: {addPublication:false},
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk)
  ),
);

export default store;
