/**
 * @fileOverview 页面路由
 * @author Max
 **/

import * as React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

const server = (input: any) => {
    return typeof window === 'undefined' ? input : <Route path="somethingelsethatisneverreachable"/>;
};

if (typeof require.ensure !== 'function') {
    require.ensure = (dep, callback) => {
        callback(require);
    };
}

export const ROUTE_PATH = {
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    TEACHER: 'teacher',
    REPORT_LIST: 'list',
    REPORT_ADD: 'new',
    REPORT_EDIT: 'edit',
    REPORT_UPLOAD: 'upload',
    TEACHER_LIST: 'list',
    TEACHER_ADD: 'new',
    TEACHER_EDIT: 'edit'
};

const Routes = [
    <Route path={`${ROUTE_PATH.DASHBOARD}`} getComponent={(nextState, callback) => {
        require.ensure([], function (require) {
            callback(null, require('./page/dashboard'));
        });
    }}>
        <Route path={`${ROUTE_PATH.REPORT}`} getComponent={(nextState, callback) => {
            require.ensure([], function (require) {
                callback(null, require('./page/dashboard/report'));
            });
        }}>
            <IndexRedirect to={`${ROUTE_PATH.REPORT_LIST}`}></IndexRedirect>
            <Route path={`${ROUTE_PATH.REPORT_LIST}`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/report/list'));
                });
            }}></Route>
            <Route path={`${ROUTE_PATH.REPORT_ADD}`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/report/add'));
                });
            }}></Route>
            <Route path={`${ROUTE_PATH.REPORT_EDIT}/:id`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/report/edit'));
                });
            }}></Route>
            <Route path={`${ROUTE_PATH.REPORT_UPLOAD}/:id`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/report/upload'));
                });
            }}></Route>
        </Route>
        <Route path={`${ROUTE_PATH.TEACHER}`} getComponent={(nextState, callback) => {
            require.ensure([], function (require) {
                callback(null, require('./page/dashboard/teacher'));
            });
        }}>
            <IndexRedirect to={`${ROUTE_PATH.TEACHER_LIST}`}></IndexRedirect>
            <Route path={`${ROUTE_PATH.TEACHER_LIST}`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/teacher/list'));
                });
            }}></Route>
            <Route path={`${ROUTE_PATH.TEACHER_ADD}`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/teacher/add'));
                });
            }}></Route>
            <Route path={`${ROUTE_PATH.TEACHER_EDIT}/:id`} getComponent={(nextState, callback) => {
                require.ensure([], function (require) {
                    callback(null, require('./page/dashboard/teacher/edit'));
                });
            }}></Route>
        </Route>
    </Route>
];

export default Routes;
