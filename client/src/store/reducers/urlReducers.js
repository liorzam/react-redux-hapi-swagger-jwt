import { SET_URL_DATA } from '../actionsTypes'
import createReducer from './createReducer'

const initialState = {
  data: []
};

const urlsReducer = createReducer(initialState, {
  [SET_URL_DATA]: (state, { payload }) => {

    return {
      ...state,
      data: payload,
    }
  },

});



export default urlsReducer;

