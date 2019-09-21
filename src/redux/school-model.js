import { handleActions, createAction } from 'redux-actions';

// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

export const actions = {
	showSchoolDetail: createAction('showSchoolDetail'),
	recordSchoolId: createAction('recordSchoolId'),
	
};
const recordSchoolDetail = createAction('recordSchoolDetail');
const switchLoading = createAction('switchLoading');
// 异步函数
const effects = {
  recordSchoolDetailSaga: function*({ payload }) {
		yield put(switchLoading());
    const data = yield call(launchRequest, APIS.GET_SCHOOL_DETAIL, { schoolId: payload });
		yield put(recordSchoolDetail(data));
		yield put(switchLoading());
  }
}

export const schoolSaga = function* () {
  yield takeLatest(actions.showSchoolDetail, effects.recordSchoolDetailSaga);
}

// 同步函数
export const schoolReducer = handleActions(
	{
		recordSchoolDetail(state, { payload: result }) {
			return {
				...state,
				schoolDetail: result
			};
		},
		switchLoading(state) {
			return {
				...state,
				detailLoading: !state.detailLoading
			}
		}
	},
	{
		schoolDetail: {},
		detailLoading: false,
	}
);
