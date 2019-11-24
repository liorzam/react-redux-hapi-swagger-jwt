import axios from "axios"

axios.defaults.baseURL = '/api';

export const setToken = token => axios && (axios.defaults.headers.common['Authorization'] = token);

export const registerUserApi = (data) => {
  console.log("--api register data: ", data)
  return axios.post("/users" , data);
}


export const loginUserApi = (data) => {
  console.log("--api login data: ", data)
  return axios.post("/login" , data);
}


export const addNewUrlApi = (data) => {
  console.log("--api add url data: ", data)
  return axios.post("/urls" , data);
}

export const getUrlsDataApi = (data) => {
  console.log("--api add url data: ", data)
  return axios.get("/urls" , data);
}
