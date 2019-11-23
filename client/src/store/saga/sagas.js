import { call, put } from "redux-saga/effects";
import {registerSuccess} from "../actions/registerActions";
import {loginSuccess} from "../actions/loginActions";
import {addNewUrlSuccess} from "../actions/urlsActions";
import {registerUserApi, loginUserApi, addNewUrlApi} from "../../api";


export function* addNewUrlAction(action) {
  try {
    console.log(action);

    const result = yield call(addNewUrlApi, action.payload);

    console.log(result);
    if(result.status === 200 && result.data){
      yield put(addNewUrlSuccess({
        url: result.data
      }));
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
    }

  } catch (error) {
    console.log("--error: ", error);
  }
}

