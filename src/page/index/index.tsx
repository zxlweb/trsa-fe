/**
 * @fileOverview index page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../base';
import {browserHistory} from 'react-router';
import {ROUTE_PATH} from '../../routes';

class Index extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {
        
    }
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        browserHistory.push(`/${ROUTE_PATH.DASHBOARD}`);
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(Index);