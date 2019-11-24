import {takeLatest} from "redux-saga/effects";
import { SIGN_UP, LOGIN, ADD_NEW_URL, GET_URLS } from '../actionsTypes'
import {registerUserSaga, loginUserData, addNewUrlAction, getUrlsData} from "./sagas";

export function* watchSaga() {
  yield takeLatest(SIGN_UP, registerUserSaga);
  yield takeLatest(LOGIN, loginUserData);
  yield takeLatest(ADD_NEW_URL, addNewUrlAction);
  yield takeLatest(GET_URLS, getUrlsData);
}
