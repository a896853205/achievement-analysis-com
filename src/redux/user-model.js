import { handleActions, createAction } from 'redux-actions'

export const actions = {
  recordUserId: createAction('recordUserId')
};

export const userReducer = handleActions({
  recordUserId(state, { payload: result }) {

    return {
      ...state,
      userId: result
    }
  }
}, {
  userId: ''
})