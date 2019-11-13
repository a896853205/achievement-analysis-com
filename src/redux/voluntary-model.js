import { handleActions, createAction } from 'redux-actions';

// saga
import { call, put, select, takeEvery } from 'redux-saga/effects';

// 请求文件
import { launchRequest } from '../util/request';
import * as APIS from '../constants/api-constants';

// user Action
import { actions as userActions } from './user-model';

export const actions = {
  prevStep: createAction('prevStep'),
  nextStep: createAction('nextStep'),
  setStep: createAction('setStep'),
  setLotId: createAction('setLotId'),
  initVoluntary: createAction('initVoluntary'),
  recordSchool: createAction('recordSchool'),
  recordSchoolList: createAction('recordSchoolList'),
  _recordSchoolList: createAction('_recordSchoolList'),
  deleteVoluntary: createAction('deleteVoluntary'),
  recordMajor: createAction('recordMajor'),
  recordVoluntaryDetail: createAction('recordVoluntaryDetail'),
  recordVoluntaryIdGetResult: createAction('recordVoluntaryIdGetResult'),
  getMeScoreRank: createAction('getMeScoreRank'),
  recordSchoolOption: createAction('recordSchoolOption'),
  recordSchoolName: createAction('recordSchoolName'),
  recordMajorName: createAction('recordMajorName'),
  recordVoluntaryResultType: createAction('recordVoluntaryResultType'),
  recordVoluntaryListOption: createAction('recordVoluntaryListOption'),
  recordVoluntaryDeepUuid: createAction('recordVoluntaryDeepUuid'),
  recordVoluntaryType: createAction('recordVoluntaryType')
};
const recordVoluntaryResult = createAction('recordVoluntaryResult');
const setMeScoreRank = createAction('setMeScoreRank');
const switchMeLoading = createAction('switchMeLoading');
const switchSchoolTableLoading = createAction('switchSchoolTableLoading');
const _recordVoluntaryListOption = createAction('_recordVoluntaryListOption');
// 异步函数
const effects = {
  recordVoluntaryResultSaga: function*({ payload }) {
    const data = yield call(launchRequest, APIS.GET_VOLUNTARY_RESULT, {
      voluntaryUuid: payload
    });
    yield put(recordVoluntaryResult(data));
  },
  // 记录志愿表的二级菜单联动
  recordVoluntaryListOptionSaga: function*({ payload }) {
    const data = yield call(launchRequest, APIS.GET_VOLUNTARY_LIST_OPTION, {
      voluntaryUuid: payload
    });
    yield put(_recordVoluntaryListOption(data));
  },
  recordMeScoreRankSaga: function*({ payload }) {
    yield put(userActions._recordUser(payload));

    yield put(switchMeLoading(true));

    const {
      fitCurrent,
      fitOld,
      lotsScoreDifferMsg,
      currentLotsScoreDifferMsg
    } = yield call(launchRequest, APIS.GET_SCORE_RANK, payload);

    // yield call(userEffects.recordUserSaga, { payload });
    yield put(
      setMeScoreRank({
        fitCurrent,
        fitOld,
        lotsScoreDifferMsg,
        currentLotsScoreDifferMsg
      })
    );
    yield put(switchMeLoading(false));
  },
  recordSchoolListSaga: function*({ payload }) {
    yield put(switchSchoolTableLoading(true));

    let schoolList = [];
    const state = yield select();
    const voluntaryStore = state['voluntaryStore'];
    const { voluntaryType } = voluntaryStore;

    // 获取当前redux学校的配置项
    // 这里需要做一下type判断,如果是1就按照学校优先来处理
    // 如果是3就按照查学校名来处理
    if (voluntaryType === 1) {
      let { schoolOption, lot_id } = voluntaryStore;

      let {
        natureValues,
        propertyValues,
        typeValues,
        areaFeatureValues,
        provinceListValues,
        gatherValue
      } = schoolOption;

      if (lot_id) {
        let data = yield call(launchRequest, APIS.GET_SCHOOL, {
          lotId: lot_id,
          natureValues,
          propertyValues,
          typeValues,
          areaFeatureValues,
          provinceListValues,
          gatherValue,
          type: voluntaryType
        });

        schoolList = data.schoolList;
      } else {
        schoolList = [];
      }
    } else if (voluntaryType === 2) {
      let { lot_id, majorName, schoolOption } = voluntaryStore;

      let {
        natureValues,
        propertyValues,
        typeValues,
        areaFeatureValues,
        provinceListValues
      } = schoolOption;

      if (lot_id && majorName !== '') {
        let data = yield call(launchRequest, APIS.GET_SCHOOL, {
          lotId: lot_id,
          majorName,
          natureValues,
          propertyValues,
          typeValues,
          areaFeatureValues,
          provinceListValues,
          type: voluntaryType
        });

        schoolList = data.schoolList;
      } else {
        schoolList = [];
      }
    } else if (voluntaryType === 3) {
      // 指定院校
      let { lot_id, schoolName } = voluntaryStore;

      if (lot_id && schoolName !== '') {
        let data = yield call(launchRequest, APIS.GET_SCHOOL, {
          lotId: lot_id,
          schoolName,
          type: voluntaryType
        });

        schoolList = data.schoolList;
      } else {
        schoolList = [];
      }
    }

    yield put(actions._recordSchoolList(schoolList));
    yield put(switchSchoolTableLoading(false));
  }
};

export const voluntarySaga = function*() {
  yield takeEvery(
    actions.recordVoluntaryIdGetResult,
    effects.recordVoluntaryResultSaga
  );
  yield takeEvery(actions.getMeScoreRank, effects.recordMeScoreRankSaga);
  yield takeEvery(actions.recordSchoolList, effects.recordSchoolListSaga);
  yield takeEvery(
    actions.recordVoluntaryListOption,
    effects.recordVoluntaryListOptionSaga
  );
};

export const voluntaryReducer = handleActions(
  {
    prevStep(state) {
      return {
        ...state,
        step: (state.step - 1) % 5
      };
    },
    nextStep(state) {
      return {
        ...state,
        step: (state.step + 1) % 5
      };
    },
    setStep(state, { payload }) {
      return {
        ...state,
        step: payload
      };
    },
    // 自己的分数信息
    setMeScoreRank(state, { payload: result }) {
      return {
        ...state,
        me: result
      };
    },
    switchMeLoading(state, { payload: result }) {
      return {
        ...state,
        meLoading: result
      };
    },
    switchSchoolTableLoading(state, { payload: result }) {
      return {
        ...state,
        schoolTableLoading: result
      };
    },
    setLotId(state, { payload: result }) {
      return {
        ...state,
        lot_id: result
      };
    },
    // 志愿部分
    recordSchoolOption(state, { payload: result }) {
      // 学校筛选条件
      // 学校选项
      // schoolOption: {
      //   natureValues: [],
      //   propertyValues: [],
      //   typeValues: [],
      //   areaFeatureValues: [],
      //   provinceListValues: [],
      //   gatherValue: 'a'
      // }
      return {
        ...state,
        schoolOption: {
          ...state.schoolOption,
          [Object.keys(result)[0]]: Object.values(result)[0]
        }
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
        major: initMajorArr(),
        gather: schoolData.gather,
        gender: schoolData.gender,
        year: schoolData.year
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
        return item.majorId === majorData.enrollment_id;
      });

      // 这里还需要清除专业
      if (majorIndex !== -1) {
        voluntary[schoolIndex].major[majorIndex] = initMajorObj();
      }

      setMajor({
        major: voluntary[schoolIndex].major[changeMajorIndex],
        majorId: majorData.enrollment_id,
        majorName: majorData.major_name
      });

      return {
        ...state,
        voluntary
      };
    },
    // 记录step5的类型(普通报表还是,深度体验报告)
    recordVoluntaryResultType(state, { payload: result }) {
      return {
        ...state,
        voluntaryResultType: result
      };
    },
    // step5的二级联动选项
    _recordVoluntaryListOption(state, { payload: result }) {
      return {
        ...state,
        voluntaryListOption: result
      };
    },
    // 志愿结果部分
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
    },
    // 记录学校列表
    _recordSchoolList(state, { payload: result }) {
      return {
        ...state,
        schoolList: result
      };
    },
    // 记录修改搜索学校输入框
    recordSchoolName(state, { payload: result }) {
      return {
        ...state,
        schoolName: result
      };
    },
    recordMajorName(state, { payload: result }) {
      return {
        ...state,
        majorName: result
      };
    },
    recordVoluntaryDeepUuid(state, { payload: result }) {
      return {
        ...state,
        voluntaryDeepUuid: result
      };
    },
    recordVoluntaryType(state, { payload: result }) {
      return {
        ...state,
        voluntaryType: result
      };
    }
  },
  {
    step: 0,
    lot_id: 0,
    // 个人信息的数据
    me: null,
    meLoading: false,
    // step3学校的数据
    tabKey: '1',
    // 学校选项
    schoolOption: {
      natureValues: [],
      propertyValues: [],
      typeValues: [],
      areaFeatureValues: [],
      provinceListValues: [],
      gatherValue: 'a'
    },
    schoolName: '',
    majorName: '',
    schoolList: [],
    schoolTableLoading: false,
    // 那种方式获取学校列表
    voluntaryType: 1,
    // 设置志愿用的数据
    voluntary: [],
    // 查看志愿用的数据
    voluntaryDetail: [],
    // 深度体验报表的id
    voluntaryDeepUuid: '',
    // step5 展示结果的类型
    voluntaryResultType: '',
    // step5 二级联动选项
    voluntaryListOption: [],
    // 查看数据结果用的数据
    voluntaryResult: {}
  }
);

function initSchoolObj(school) {
  school.schoolName = '';
  school.schoolId = undefined;
  // 这里还需要清除专业数组
  school.major = initMajorArr();
  school.gather = undefined;
  school.gender = undefined;
  school.year = undefined;
}

function setSchool({
  school,
  schoolName,
  schoolId,
  major,
  gather,
  gender,
  year
}) {
  school.schoolName = schoolName;
  school.schoolId = schoolId;
  school.major = major;
  school.gather = gather;
  school.gender = gender;
  school.year = year;
}

function initMajorArr() {
  let arr = [];

  for (let i = 0; i <= 5; i++) {
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
