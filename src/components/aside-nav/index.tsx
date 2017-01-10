/**
 * @fileOverview Navigation bar aside
 * @author Max 
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../base';
import {browserHistory} from 'react-router';

const style = _importLess('./index', __dirname);
class AsideNav extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    render() {
        let navs: any = [];
        this.props.navItems.map((item: any) => {
            let active = '';
            if(this.props.location.pathname.indexOf(item.href) !== -1) {
                active = 'active';
            }
            navs.push(
                <li key={item.href} className={active} onClick={e => browserHistory.push(item.href)}>{item.title}</li>
            );
        });

        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <ul id="aside-nav">
                    {navs}
                </ul>
            </div>
        );
    }
}

const selector = () => ({});

export = connect<any, any, any>(selector)(AsideNav);