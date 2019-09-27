import { handleActions, createAction } from 'redux-actions'

// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

export const actions = {
  recordUser: createAction('recordUser'),
  _recordUser: createAction('_recordUser'),
  getUser: createAction('getUser'),
  clearUser: createAction('clearUser'),
};
const _switchUserLoading = createAction('_switchUserLoading');

export const effects = {
  recordUserSaga: function*({ payload }) {
    yield put(actions._recordUser(payload));
    yield put(_switchUserLoading());
    yield call(launchRequest, APIS.SET_USER_INFO, payload);
    yield put(_switchUserLoading());
  },
  getUserSaga: function*() {
    yield put(_switchUserLoading());
    let data = yield call(launchRequest, APIS.GET_USER_INFO);
    yield put(actions._recordUser(data));
    yield put(_switchUserLoading());
  }
}

export const userSaga = function*() {
  yield takeLatest(
    actions.recordUser,
    effects.recordUserSaga
  );
  yield takeLatest(
    actions.getUser,
    effects.getUserSaga
  );
};

export const userReducer = handleActions({
  _recordUser(state, { payload: result }) {

    return {
      ...state,
      user: {
        ...(state.user),
        ...result
      }
    }
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
    }
  }
}, {
  user: {},
  userLoading: false,
})