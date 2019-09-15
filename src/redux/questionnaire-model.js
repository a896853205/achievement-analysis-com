import { handleActions, createAction } from "redux-actions";

export const actions = {
  setQuesStatus: createAction("setQuesStatus")
};

export const questionnaireReducer = handleActions(
  {
    setQuesStatus(state, { payload: results }) {

      return {
        ...state,
        status: results
      };
    }
  },
  {
    status: 0
  }
);
