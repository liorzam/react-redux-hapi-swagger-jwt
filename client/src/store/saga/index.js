import {takeEvery} from "redux-saga/effects";
import types from '../actionsTypes'
import {registerUserSaga, loginUserData, addNewUrlAction} from "./sagas";

export function* watchSaga() {
  yield takeEvery(types.SIGN_UP, registerUserSaga);
  yield takeEvery(types.LOGIN, loginUserData);
  yield takeEvery(types.ADD_NEW_URL, addNewUrlAction);
}
