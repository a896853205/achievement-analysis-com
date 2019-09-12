import { handleActions, createAction } from 'redux-actions'

export const actions = {
  nextStep: createAction('nextStep')
};

export const voluntaryReducer = handleActions({
  nextStep(state) {

    return {
      ...state,
      step: (state.step + 1) % 4
    }
  }
}, {
  step: 0
})