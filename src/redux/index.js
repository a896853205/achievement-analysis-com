import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { userReducer as userStore } from './user-model';
import { voluntaryReducer as voluntaryStore, voluntarySaga } from './voluntary-model';
import { questionnaireReducer as questionnaireStore } from './questionnaire-model'
import { schoolReducer as schoolStore, schoolSaga } from './school-model';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  userStore,
  schoolStore,
  voluntaryStore,
  questionnaireStore,
});

const rootSaga = function* () {
  yield all([
    schoolSaga(),
    voluntarySaga(),
    // watchIncrementAsync()
  ])
  // code after all-effect
}

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);