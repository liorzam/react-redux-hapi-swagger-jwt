import { AUTH_COMPLETED } from '../actionsTypes'
import createReducer from './createReducer'

const initialState = {
  user: null,
  token: null,
  isRegisterSuccess: false
};

const authReducer = createReducer(initialState, {
  [AUTH_COMPLETED]: (state, { payload }) => {

    const {user, token} = payload;

    return {
      ...state,
      user,
      token,
      isAuthenticated: true
    }
  },

});



export default authReducer;

