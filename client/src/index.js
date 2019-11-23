import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./store/reducers";
import {watchSaga} from "./store/saga";

const
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose, // for redux plugin
  sagaMiddleware = createSagaMiddleware(),
  middlewares = [sagaMiddleware],
  store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(watchSaga);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
