import { handleActions, createAction } from "redux-actions";

export const actions = {
  setQuesStatus: createAction("setQuesStatus")
};

export const questionnaireReducer = handleActions(
  {
    setQuesStatus(state, { payload: status }) {

      return {
        ...state,
        status: status
      };
    }
  },
  {
    status: 0
  }
);
