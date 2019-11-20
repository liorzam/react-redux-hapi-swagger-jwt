import actionsTypes from '../actionsTypes'
import createReducer from '../reducers/createReducer'

const initialState = {
  data: []
};

const headerReducer = createReducer(initialState, {
  [actionsTypes.SET_ITEMS]: (state, {payload}) => {
    return {
      ...state,
      data: payload
    }
  },
  [actionsTypes.ADD_ITEM]: (state, {payload}) => {
    const newData = [...state.data].push(payload);
    return {
      ...state,
      data: newData
    }
  },
  [actionsTypes.EDIT_ITEM]: (state, {payload}) => {
    /*const newData = [...state.data].push(payload);
    return {
      ...state,
      data: newData
    }*/
  },
  [actionsTypes.DELETE_ITEM]: (state, {payload}) => {
    /*const newData = [...state.data].push(payload);
    return {
      ...state,
      data: newData
    }*/
  }
});

export default headerReducer;

