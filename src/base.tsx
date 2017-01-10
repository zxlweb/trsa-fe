/**
 * @fileOverview base组件
 * @author Max
 */

import * as React from 'react';
import HTMLWrap from './framework/bootstrap/wrap';
import * as Immutable from 'immutable';
import * as express from 'express';

export interface Interceptor {
    (wrap: HTMLWrap, config: Immutable.Map<any, any>, props: any, res: express.Response, req: express.Request): Promise<any> | void
}

interface BasePropTypes{
    dispatch?: Function,
    params?: any,
    location?: {
        search: string
    }
}

abstract class BaseComponent<P, S> extends React.Component<P & BasePropTypes, S> {
    constructor(props: any) {
        super(props);
    }
    getInitDataAction(force?: boolean, props?: any): {} {
        return null;
    }
    componentDidMount() {
        const {dispatch} = this.props;
        let action = this.getInitDataAction(false, this.props);
        if(action !== null) {
            dispatch(action);
        }
    }
}

export default BaseComponent;