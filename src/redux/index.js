import { createStore, combineReducers } from 'redux';

import { userReducer as userStore } from './user-model';
import { voluntaryReducer as voluntaryStore } from './voluntary-model';
import { questionnaireReducer as questionnaireStore } from './questionnaire-model'

const rootReducer = combineReducers({
  userStore,
  voluntaryStore,
  questionnaireStore,
});

export const store = createStore(
  rootReducer,
);