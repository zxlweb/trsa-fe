/**
 * @fileOverview 页面渲染
 * @author Max
 */

import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import config from '../config';
import {compose, createStore, applyMiddleware} from 'redux';
import APP from '../../../a-reducer/app';
import startsWith = require('lodash.startswith');
import cloneDeep = require('lodash.clonedeep');
import * as Immutable from 'immutable';
import HTMLWrap from '../../bootstrap/wrap';
import routes = require('../../bootstrap/routes');
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import {getDeviceVars} from './device-detect'; 
import promiseMiddleware = require('redux-promise');
import ValidatorMiddleware = require('redux-validator');
import ThunkMiddleware from 'redux-thunk';

const router = express.Router();
const finalCreateStore = compose(
    applyMiddleware(ValidatorMiddleware(), ThunkMiddleware, promiseMiddleware)
)(createStore);
const TIMEOUT = 10 * 1000;

const configJS = exportConfigToGlobalConst(config.toJS());

router.all('*', function(req, res, next) {
    console.log(`new request ${req.path}`);
    
    match({
        routes,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        if(redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if(error) {
            next(error);
        } else if(renderProps === undefined) {
            res.status(404).send('Not found');
        } else {
            let wrap = new HTMLWrap();

            let asyncTasks: Promise<any>[] = [];
            let initialDataActions: any[] = [];
            
            renderProps.components.map((item: any) => {
                if(item && item.WrappedComponent && item.WrappedComponent.interceptor) {
                    let promise = item.WrappedComponent.interceptor(wrap, config, renderProps, res, req);
                    if(Promise.prototype.isPrototypeOf(promise)) asyncTasks.push(promise);
                }
                if(item && item.WrappedComponent) {
                    let component = new item.WrappedComponent();
                    let action = component.getInitDataAction(true, renderProps);
                    action !== null && initialDataActions.push(action);
                }
            });

            let timeoutFlag = true;

            let initialStateImmutable: any = {};
            if(req.cookies.initialData) {
                const initialData = JSON.parse(req.cookies.initialData);
                for(let i in initialData) {
                    let item = initialData[i];
                    initialStateImmutable[i] = Immutable.fromJS(item);
                }
            }
            const store = finalCreateStore(APP, initialStateImmutable);
            initialDataActions.forEach(item => {
                
                asyncTasks.push(store.dispatch(item));
            });
            
            const renderPage = () => {
                timeoutFlag = false;

                let html: string;
                try {
                    let thisGlobalVars: any = cloneDeep(configJS);
                    const deviceVars = getDeviceVars(req.headers['user-agent']);
                    Object.assign(thisGlobalVars, deviceVars);
                    thisGlobalVars.__INITIAL_STATE__ = encodeURIComponent(JSON.stringify(store.getState()));
                    wrap.injectGlobalVar(thisGlobalVars);

                    const createElement = (Component: any, props: any) => {
                        let newProps = props;
                        for(let i in thisGlobalVars) {
                            newProps[i] = thisGlobalVars[i];
                        }
                        return React.createElement(Component, newProps);
                    };
                    
                    html = ReactDOMServer.renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} createElement={createElement} />
                        </Provider>
                    );
                } catch(e) {
                    next(e);
                    return;
                }

                html = wrap.getHead() + (html || '') + wrap.getBottom();
                res.setHeader('Content-Type', 'text/html');
                res.send(html);
                res.end();
            };


            setTimeout(function () {
                if(timeoutFlag) {
                    next(new Error('request timeout'));
                }
            }, TIMEOUT);

            Promise.all(asyncTasks).then(renderPage).catch((err) => {
                timeoutFlag = false;
                next(err);
            });
        }
    });
});

function exportConfigToGlobalConst(config: any) {
    let result: any = {};
    const read = (key: string[], obj: any) => {
        if(typeof obj === 'object') {
            for(let i in obj) {
                let item = obj[i];
                let newKey = cloneDeep(key);
                newKey.push(i);
                read(newKey, item);
            }
        } else {
            let keyStr = `__${key.join('_')}__`;
            if(keyStr.indexOf('@') !== -1) return;
            result[keyStr] = obj;
        }
    };
    
    read([], config);
    
    return result;
}


export default router;