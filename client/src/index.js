import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import reducers from "./store/reducers";
import {watchSaga} from "./store/saga";
import { PersistGate } from 'redux-persist/es/integration/react'

const
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, // for redux plugin
  sagaMiddleware = createSagaMiddleware(),
  middlewares = [sagaMiddleware],
  store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(watchSaga);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate 
        loading={'Loading...'}
        persistor={persistor}>
          <App/>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
