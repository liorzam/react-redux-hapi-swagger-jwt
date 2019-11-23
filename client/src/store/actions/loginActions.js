import types from "../actionsTypes";

export const login = data => {
  return{
    type: types.LOGIN,
    payload: data
  };
}

export const loginSuccess = data => {
    return{
      type: types.AUTH_COMPLETED,
      payload: data
    };
  }
  





