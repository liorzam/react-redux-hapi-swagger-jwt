import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from "./authReducer";
import urlReducer from "./urlReducers";

const authPersistConfig = {
  key: 'root',
  storage,
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  urls: urlReducer
});
