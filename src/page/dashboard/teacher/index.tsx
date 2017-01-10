/**
 * @fileOverview Teacher Index
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../../base';

const style = _importLess('./index', __dirname);
class TeacherIndex extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-teacher">
                     {this.props.children}
                </div>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(TeacherIndex);