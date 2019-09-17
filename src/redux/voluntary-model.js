import { handleActions, createAction } from 'redux-actions';

export const actions = {
	nextStep: createAction('nextStep'),
	setLotId: createAction('setLotId'),
	initVoluntary: createAction('initVoluntary'),
  recordSchool: createAction('recordSchool'),
  deleteVoluntary: createAction('deleteVoluntary'),
};

export const voluntaryReducer = handleActions(
	{
		nextStep(state) {
			return {
				...state,
				step: (state.step + 1) % 4
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
				arr[index].schoolName = '';
				arr[index].schoolId = undefined;
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
			}

			// 新位置修改
			let changeIndex = voluntary.findIndex((item) => {
				return item.five_volunteer_id === changeVolunteerId;
			});

			voluntary[changeIndex].schoolName = schoolData.school_name;
			voluntary[changeIndex].schoolId = schoolData.school_id;

			return {
				...state,
				voluntary
			};
		}
	},
	{
		step: 0,
		lot_id: 0,
		voluntary: []
	}
);
