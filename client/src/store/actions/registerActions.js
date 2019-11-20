import types from "../actionsTypes";

export const setEmailInput = data =>{
  return{
    type: types.SET_EMAIL_INPUT,
    payload: data
  };
};



