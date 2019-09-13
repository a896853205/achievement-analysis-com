import { handleActions, createAction } from 'redux-actions'

export const actions = {
  nextStep: createAction('nextStep'),
  setLotId: createAction('setLotId')
};

export const voluntaryReducer = handleActions({
  nextStep(state) {

    return {
      ...state,
      step: (state.step + 1) % 4
    }
  },
  setLotId(state, { payload: result }) {

    return {
      ...state,
      lot_id: result
    }
  }
}, {
  step: 0,
  lot_id: 0
})