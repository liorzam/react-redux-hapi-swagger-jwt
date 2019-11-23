import types from "../actionsTypes";

export const addNewUrl = data => {
  console.log(data);
  return{
    type: types.ADD_NEW_URL,
    payload: data
  };
}

export const addNewUrlSuccess = data => {
  return{
    type: types.ADD_NEW_URL_SUCCESS,
    payload: data
  };
}





