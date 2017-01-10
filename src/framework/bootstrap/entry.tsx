/**
 * @fileOverview APP页面入口
 * @author Max
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import routes = require('./routes');
import {match, Router, browserHistory} from 'react-router';
import {compose, createStore, applyMiddleware, GenericStoreEnhancer} from 'redux';
import APP from '../../a-reducer/app';
import * as Immutable from 'immutable';
import promiseMiddleware = require('redux-promise');
import ValidatorMiddleware = require('redux-validator');
import ThunkMiddleware from 'redux-thunk';
import retina, {fNormal} from '../utils/retina';
retina();
window.fNormal = fNormal;

import getRequestMethod from '../utils/iso-request';
const requestMothods = getRequestMethod();
window._http = requestMothods.http;
window._https = requestMothods.https;

import Storage from '../utils/storage';
window._storage = Storage;

import {init as WechatSDKSetup} from '../utils/wechat-sdk-setup';
window._wechatSDKSetup = WechatSDKSetup;

let finalCreateStore: any, devTools: any;

if(__WEBPACK_DEV__) {
    const createDevTools = require('redux-devtools').createDevTools;
    const LogMonitor = require('redux-devtools-log-monitor').default;
    const DockMonitor = require('redux-devtools-dock-monitor').default;
    devTools = createDevTools(
        <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
            <LogMonitor theme='tomorrow' />
        </DockMonitor>
    );
    const persistState = require('redux-devtools').persistState;
    const getDebugSessionKey = () => {
        const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
        return (matches && matches.length > 0)? matches[1] : null;
    };
    const createLogger = require('redux-logger');
    finalCreateStore = compose(
       applyMiddleware(ValidatorMiddleware(), ThunkMiddleware, promiseMiddleware, createLogger({
           stateTransformer: (state: any) => {
               let newState: any = {};
               for(let i in state) {
                   if(Immutable.Iterable.isIterable(state[i])) {
                       newState[i] = state[i].toJS();
                   } else {
                       newState[i] = state[i];
                   }
               }
               return newState;
           }
       })),
       devTools.instrument() as GenericStoreEnhancer,
       persistState(getDebugSessionKey()) as GenericStoreEnhancer
   )(createStore);
} else {
    finalCreateStore = compose(
       applyMiddleware(ValidatorMiddleware(), ThunkMiddleware, promiseMiddleware)
   )(createStore);
}


let initialState = JSON.parse(decodeURIComponent(__INITIAL_STATE__));
for(let i in initialState) {
    initialState[i] = Immutable.fromJS(initialState[i]);
}

const store = finalCreateStore(APP, initialState);

const customProps: any = {
    __MOBILE__,
    __PHONE__,
    __TABLET__,
    devTools
};
const createElement = (Component: any, props: any) => {
    let newProps = props;
    for(let i in customProps) {
        newProps[i] = customProps[i];
    }
    return React.createElement(Component, newProps);
};

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    ReactDOM.render((
        <Provider store={store}>
            <Router createElement={createElement} {...renderProps} />
        </Provider>
    ), document.getElementById('root'));
});
