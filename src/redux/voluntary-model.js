import { handleActions, createAction } from 'redux-actions';

export const actions = {
	nextStep: createAction('nextStep'),
	setStep: createAction('setStep'),
	setLotId: createAction('setLotId'),
	initVoluntary: createAction('initVoluntary'),
	recordSchool: createAction('recordSchool'),
	deleteVoluntary: createAction('deleteVoluntary'),
	recordMajor: createAction('recordMajor'),
	recordVoluntaryDetail: createAction('recordVoluntaryDetail'),
	recordVoluntaryId: createAction('recordVoluntaryId')
};

export const voluntaryReducer = handleActions(
	{
		nextStep(state) {
			return {
				...state,
				step: (state.step + 1) % 5
			};
		},
		setStep(state, { payload: result }) {
			return {
				...state,
				step: result,
			}
		},
		setLotId(state, { payload: result }) {
			return {
				...state,
				lot_id: result
			};
		},
		initVoluntary(state, { payload: result }) {
			result.forEach((item, index, arr) => {
				arr[index].schoolName = '';
				arr[index].schoolId = undefined;
				arr[index].major = [
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					}
				];
			});

			return {
				...state,
				voluntary: result
			};
		},
		deleteVoluntary(state, { payload: result }) {
			let { voluntary } = state,
				oldIndex = voluntary.findIndex((item) => {
					return item.five_volunteer_id === result;
				});

			if (oldIndex !== -1) {
				voluntary[oldIndex].schoolName = '';
				voluntary[oldIndex].schoolId = undefined;
				voluntary[oldIndex].major = [
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					}
				];
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
			let oldIndex = voluntary.findIndex((item) => {
				return item.schoolId === schoolData.school_id;
			});

			if (oldIndex !== -1) {
				voluntary[oldIndex].schoolName = '';
				voluntary[oldIndex].schoolId = undefined;
				// 这里还需要清除专业数组
				voluntary[oldIndex].major = [
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					},
					{
						majorId: '',
						majorName: ''
					}
				];
			}

			// 新位置修改
			let changeIndex = voluntary.findIndex((item) => {
				return item.five_volunteer_id === changeVolunteerId;
			});

			voluntary[changeIndex].schoolName = schoolData.school_name;
			voluntary[changeIndex].schoolId = schoolData.school_id;
			voluntary[changeIndex].major = [
				{
					majorId: '',
					majorName: ''
				},
				{
					majorId: '',
					majorName: ''
				},
				{
					majorId: '',
					majorName: ''
				},
				{
					majorId: '',
					majorName: ''
				},
				{
					majorId: '',
					majorName: ''
				},
				{
					majorId: '',
					majorName: ''
				}
			];

			return {
				...state,
				voluntary
			};
		},
		recordMajor(state, { payload: result }) {
			let { voluntary } = state,
				{ majorData, schoolId, changeMajorIndex } = result;
			
			// 找学校的志愿
			let schoolIndex = voluntary.findIndex((item) => {
				return item.schoolId === schoolId;
			});

			// 找专业的位置
			let majorIndex = voluntary[schoolIndex].major.findIndex(item => {
				return item.majorId === majorData.major_id;
			});

			// 这里还需要清除专业
			if (majorIndex !== -1) {
				voluntary[schoolIndex].major[majorIndex] = {
					majorId: '',
					majorName: ''
				};
			}

			voluntary[schoolIndex].major[changeMajorIndex].majorId = majorData.major_id;
			voluntary[schoolIndex].major[changeMajorIndex].majorName = majorData.major_name;

			return {
				...state,
				voluntary
			};
		},

		recordVoluntaryDetail(state, { payload: result }) {
			return {
				...state,
				voluntaryDetail: result,
			};
		},

		recordVoluntaryId(state, { payload: result }) {
			return {
				...state,
				voluntaryId: result,
			};
		}
	},
	{
		step: 0,
		lot_id: 0,
		// 设置志愿用的数据
		voluntary: [],
		// 查看志愿用的数据
		voluntaryId: '',
		voluntaryDetail: [],
	}
);
