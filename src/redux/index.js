import { createStore, combineReducers } from 'redux';

import { userReducer as userStore } from './user-model';

const rootReducer = combineReducers({
  userStore,
});

export const store = createStore(
  rootReducer,
);