import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const initialState = {
  publications: [],
  labels: [],
  //live only
  visibility: {addPublication:false},
  //filters: [],
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk)
  ),
);

export default store;