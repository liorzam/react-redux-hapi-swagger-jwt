import {LOGIN, AUTH_COMPLETED} from "../actionsTypes";

export const login = data => {
  return{
    type: LOGIN,
    payload: data
  };
}

export const loginSuccess = data => {
    return{
      type: AUTH_COMPLETED,
      payload: data
    };
  }
  





