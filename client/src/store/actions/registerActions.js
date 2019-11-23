import types from "../actionsTypes";



export const signUp = data => {
  return{
    type: types.SIGN_UP,
    payload: data
  };
}

export const registerSuccess = data => {
  return{
    type: types.AUTH_COMPLETED,
    payload: data
  };
}






