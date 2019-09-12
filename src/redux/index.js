import { createStore, combineReducers } from 'redux';

import { userReducer as userStore } from './user-model';
import { voluntaryReducer as voluntaryStore } from './voluntary-model';

const rootReducer = combineReducers({
  userStore,
  voluntaryStore
});

export const store = createStore(
  rootReducer,
);