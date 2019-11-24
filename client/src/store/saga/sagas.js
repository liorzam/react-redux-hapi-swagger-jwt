import { call, put } from "redux-saga/effects";
import {registerSuccess} from "../actions/registerActions";
import {loginSuccess} from "../actions/loginActions";
import {addNewUrlSuccess, setUrlsData} from "../actions/urlsActions";
import {registerUserApi, loginUserApi, addNewUrlApi, getUrlsDataApi, setToken} from "../../api";


export function* addNewUrlAction(action) {
  try {
    console.log(action);

    const result = yield call(addNewUrlApi, action.payload);

    console.log(result);
    if(result.status === 200 && result.data){
      yield put(addNewUrlSuccess({
        url: result.data
      }));
      yield getUrlsData();
    }

  } catch (error) {
    console.log("--error: ", error)
  }
}


export function* registerUserSaga(action) {
  try {
    console.log(action);

    const result = yield call(registerUserApi, action.payload);

    console.log(result);
    if(result.status === 200 && result.data){
      yield put(registerSuccess({
        token: result.authToken,
        user: result.user,
      }));

      setToken(result.data.authToken);
    }

  } catch (error) {
    console.log("--error: ", error)
    // yield put({ type: types.ACTION_FAILED, payload: error.message });
  }
}

export function* loginUserData(action) {
  try {

    const result = yield call(loginUserApi, action.payload);

    if(result.status === 200 && result.data){
      console.log(result.data);
      yield put(loginSuccess({
        token: result.data.authToken,
        user: result.data.user,
      }));

      setToken(result.data.authToken);
    }

  } catch (error) {
    console.log("--error: ", error);
  }
}


export function* getUrlsData() {
  try {

    const result = yield call(getUrlsDataApi);

    if(result.status === 200 && result.data){
      console.log(result.data);
      yield put(setUrlsData(result.data.map(url => ({...url, timestampCreatedAt: new Date(url.createdAt)}))));
    }

  } catch (error) {
    console.log("--error: ", error);
  }
}

