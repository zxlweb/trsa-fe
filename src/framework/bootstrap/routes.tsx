/**
 * @fileOverview 页面路由bootstrap
 * @author Max
 **/

import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root = require('../../page/root');

if (typeof require.ensure !== 'function') {
    require.ensure = (dep, callback) => {
        callback(require);
    };
}

const routes = (
    <Route path="/" component={Root} getChildRoutes={(partialNextState, callback) => {
        require.ensure([], function(require) {
            callback(null, require('../../routes').default);
        });
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../../page/index'));
            });
        }} />
    </Route>
);

export = routes;