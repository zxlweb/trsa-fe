/**
 * @fileOverview Dashboard root
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../base';
import Header = require('../../components/header');
import AsideNav = require('../../components/aside-nav');
import {Row, Col} from 'antd';
import {ROUTE_PATH} from '../../routes';
import {browserHistory} from 'react-router';

const NAV_ITEM = [
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`,
        title: '报告管理'
    },
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}`,
        title: '教师管理'
    },
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.AD}`,
        title: '广告管理'
    }
];

const style = _importLess('./index', __dirname);
class Dashboard extends BaseComponent<{
    account: string
}, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        const {account} = this.props;
        if(account === undefined) {
            browserHistory.push('/');
        }
    }
    render() {
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-dashboard">
                    <Header></Header>
                    <AsideNav navItems={NAV_ITEM} {...this.props}></AsideNav>
                    <div className="content-section">
                        <Row>
                            <Col span={18} offset={5}>
                                {this.props.children}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any) => state.user.get('account'),
    (account: string) => ({
        account
    })
);

export = connect(selector)(Dashboard);