import { call, put } from "redux-saga/effects";
import types from "../actionsTypes";
import { setEmailInput } from "../actions/registerActions";

let data = [
  {name: "Dan"}
];

// export function* setEmailInput(action) {
//   try {
//     // const result = yield call(fetchItemsApi, action.payload);

//     yield put(setEmailInput(action.payload));
//   } catch (error) {
//     yield put({ type: types.ACTION_FAILED, payload: error.message });
//   }
// }
