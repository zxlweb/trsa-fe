/**
 * @fileOverview Site header
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../base';

const style = _importLess('./index', __dirname);
class SiteHeader extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <header>
                    <div className="row">
                        <div className="col-6 title">
                            <h1>TRS后台管理系统</h1>
                        </div>
                        
                    </div>
                </header>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(SiteHeader);