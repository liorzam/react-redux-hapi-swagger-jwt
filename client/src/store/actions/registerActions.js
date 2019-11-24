import {AUTH_COMPLETED, SIGN_UP} from "../actionsTypes";


export const signUp = data => {
  return{
    type: SIGN_UP,
    payload: data
  };
}

export const registerSuccess = data => {
  return{
    type: AUTH_COMPLETED,
    payload: data
  };
}






