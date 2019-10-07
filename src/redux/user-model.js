import { handleActions, createAction } from 'redux-actions';

// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

import { actions as voluntaryActions } from '@/redux/voluntary-model';

export const actions = {
  recordUser: createAction('recordUser'),
  recordUserBasic: createAction('recordUserBasic'),
  recordUserImport: createAction('recordUserImport'),
  _recordUser: createAction('_recordUser'),
  getUser: createAction('getUser'),
  clearUser: createAction('clearUser')
};
const _switchUserLoading = createAction('_switchUserLoading');

export const effects = {
  recordUserSaga: function*({ payload }) {
    yield put(actions._recordUser(payload));
    yield put(_switchUserLoading());
    let data = yield call(launchRequest, APIS.SET_USER_INFO, payload);
    yield put(_switchUserLoading());
    yield put(actions._recordUser(data));
    // 将来set完需要后台返回最新的user然后_recordUser.!-----------------
  },
  getUserSaga: function*() {
    yield put(_switchUserLoading());
    let data = yield call(launchRequest, APIS.GET_USER_INFO);
    yield put(actions._recordUser(data));

    if (data && +data.score > 0) {
      yield put(voluntaryActions.setStep(1));
      yield put(voluntaryActions.getMeScoreRank(data));
    }

    yield put(_switchUserLoading());
  },
  recordUserBasicSaga: function*({ payload }) {
    yield put(actions._recordUser(payload));
    yield put(_switchUserLoading());
    let data = yield call(launchRequest, APIS.SET_USER_BASIC_INFO, payload);
    yield put(_switchUserLoading());
    yield put(actions._recordUser(data));
  },
  recordUserImportSaga: function*({ payload }) {
    yield put(actions._recordUser(payload));
    yield put(_switchUserLoading());
    let data = yield call(launchRequest, APIS.SET_USER_IMPORT_INFO, payload);
    yield put(_switchUserLoading());
    yield put(actions._recordUser(data));
  }
};

export const userSaga = function*() {
  yield takeLatest(actions.recordUser, effects.recordUserSaga);
  yield takeLatest(actions.recordUserBasic, effects.recordUserBasicSaga);
  yield takeLatest(actions.recordUserImport, effects.recordUserImportSaga);
  yield takeLatest(actions.getUser, effects.getUserSaga);
};

export const userReducer = handleActions(
  {
    _recordUser(state, { payload: result }) {
      return {
        ...state,
        user: {
          ...state.user,
          ...result
        }
      };
    },
    _switchUserLoading(state) {
      return {
        ...state,
        userLoading: !state.userLoading
      };
    },
    clearUser(state) {
      return {
        ...state,
        user: {}
      };
    }
  },
  {
    user: {},
    userLoading: false
  }
);
