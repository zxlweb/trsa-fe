/**
 * @fileOverview Report Index
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../../base';

const style = _importLess('./index', __dirname);
class ReportIndex extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-report">
                     {this.props.children}
                </div>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(ReportIndex);