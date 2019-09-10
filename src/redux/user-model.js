import { handleActions, createAction } from 'redux-actions'

export const actions = {
  recordUser: createAction('recordUser')
};

export const userReducer = handleActions({
  recordUser(state, { payload: result }) {

    return {
      ...state,
      user: result
    }
  }
}, {
  user: {}
})