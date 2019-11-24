import {GET_URLS, ADD_NEW_URL, ADD_NEW_URL_SUCCESS, SET_URL_DATA} from "../actionsTypes";

export const getUrls = () => {
  return{
    type: GET_URLS
  };
}
export const addNewUrl = data => {
  console.log(data);
  return{
    type: ADD_NEW_URL,
    payload: data
  };
}

export const addNewUrlSuccess = data => {
  return{
    type: ADD_NEW_URL_SUCCESS,
    payload: data
  };
}


export const setUrlsData = data => {
  return{
    type: SET_URL_DATA,
    payload: data
  };
}





