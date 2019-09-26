import { handleActions, createAction } from 'redux-actions';

// saga
import { call, put, takeLatest } from 'redux-saga/effects';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

export const actions = {
  prevStep: createAction('prevStep'),
  nextStep: createAction('nextStep'),
  setLotId: createAction('setLotId'),
  initVoluntary: createAction('initVoluntary'),
  recordSchool: createAction('recordSchool'),
  deleteVoluntary: createAction('deleteVoluntary'),
  recordMajor: createAction('recordMajor'),
  recordVoluntaryDetail: createAction('recordVoluntaryDetail'),
  recordVoluntaryIdGetResult: createAction('recordVoluntaryIdGetResult'),
  getMeScoreRank: createAction('getMeScoreRank')
};
const recordVoluntaryResult = createAction('recordVoluntaryResult');
const setMeScoreRank = createAction('setMeScoreRank');
const switchMeLoading = createAction('switchMeLoading');
// 异步函数
const effects = {
  recordVoluntaryResultSaga: function*({ payload }) {
    const data = yield call(launchRequest, APIS.GET_VOLUNTARY_RESULT, {
      voluntaryUuid: payload
    });
    yield put(recordVoluntaryResult(data));
  },
  recordMeScoreRankSaga: function*({ payload }) {
    yield put(switchMeLoading());

    const { fitCurrent, fitOld } = yield call(
      launchRequest,
      APIS.GET_SCORE_RANK,
      payload
    );

    yield put(setMeScoreRank({ fitCurrent, fitOld }));
    yield put(switchMeLoading());
  }
};

export const voluntarySaga = function*() {
  yield takeLatest(
    actions.recordVoluntaryIdGetResult,
    effects.recordVoluntaryResultSaga
  );
  yield takeLatest(actions.getMeScoreRank, effects.recordMeScoreRankSaga);
};

export const voluntaryReducer = handleActions(
  {
    prevStep(state) {
      return {
        ...state,
        step: (state.step - 1) % 4
      };
    },
    nextStep(state) {
      return {
        ...state,
        step: (state.step + 1) % 4
      };
    },
    setMeScoreRank(state, { payload: result }) {
      return {
        ...state,
        me: result
      };
    },
    switchMeLoading(state) {
      return {
        ...state,
        meLoading: !state.meLoading
      };
    },
    setLotId(state, { payload: result }) {
      return {
        ...state,
        lot_id: result
      };
    },
    initVoluntary(state, { payload: result }) {
      result.forEach((item, index, arr) => {
        initSchoolObj(arr[index]);
      });

      return {
        ...state,
        voluntary: result
      };
    },
    deleteVoluntary(state, { payload: result }) {
      let { voluntary } = state,
        oldIndex = voluntary.findIndex(item => {
          return item.five_volunteer_id === result;
        });

      if (oldIndex !== -1) {
        initSchoolObj(voluntary[oldIndex]);
      }

      return {
        ...state,
        voluntary
      };
    },
    recordSchool(state, { payload: result }) {
      let { voluntary } = state;
      let { changeVolunteerId, schoolData } = result;

      // 找到原来的位置清空
      let oldIndex = voluntary.findIndex(item => {
        return item.schoolId === schoolData.school_id;
      });

      if (oldIndex !== -1) {
        initSchoolObj(voluntary[oldIndex]);
      }

      // 新位置修改
      let changeIndex = voluntary.findIndex(item => {
        return item.five_volunteer_id === changeVolunteerId;
      });

      setSchool({
        school: voluntary[changeIndex],
        schoolName: schoolData.school_name,
        schoolId: schoolData.school_id,
        major: initMajorArr()
      });

      return {
        ...state,
        voluntary
      };
    },
    recordMajor(state, { payload: result }) {
      let { voluntary } = state,
        { majorData, schoolId, changeMajorIndex } = result;

      // 找学校的志愿
      let schoolIndex = voluntary.findIndex(item => {
        return item.schoolId === schoolId;
      });

      // 找专业的位置
      let majorIndex = voluntary[schoolIndex].major.findIndex(item => {
        return item.majorId === majorData.major_id;
      });

      // 这里还需要清除专业
      if (majorIndex !== -1) {
        voluntary[schoolIndex].major[majorIndex] = initMajorObj();
      }

      setMajor({
        major: voluntary[schoolIndex].major[changeMajorIndex],
        majorId: majorData.major_id,
        majorName: majorData.major_name
      });

      return {
        ...state,
        voluntary
      };
    },

    recordVoluntaryDetail(state, { payload: result }) {
      return {
        ...state,
        voluntaryDetail: result
      };
    },

    recordVoluntaryResult(state, { payload: result }) {
      return {
        ...state,
        voluntaryResult: result
      };
    }
  },
  {
    step: 0,
    lot_id: 0,
    me: null,
    meLoading: false,
    // 设置志愿用的数据
    voluntary: [],
    // 查看志愿用的数据
    voluntaryDetail: [],
    // 查看数据结果用的数据
    voluntaryResult: {}
  }
);

function initSchoolObj(school) {
  school.schoolName = '';
  school.schoolId = undefined;
  // 这里还需要清除专业数组
  school.major = initMajorArr();
}

function setSchool({ school, schoolName, schoolId, major }) {
  school.schoolName = schoolName;
  school.schoolId = schoolId;
  school.major = major;
}

function initMajorArr() {
  let arr = [];

  for (let i = 0; i < 5; i++) {
    arr.push(initMajorObj());
  }

  return arr;
}

function initMajorObj() {
  return {
    majorId: '',
    majorName: ''
  };
}

function setMajor({ major, majorId, majorName }) {
  major.majorId = majorId;
  major.majorName = majorName;
}
