/**
 * @fileOverview Dashboard root
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../base';
import Header = require('../../components/header');
import AsideNav = require('../../components/aside-nav');
import {Row, Col} from 'antd';
import {ROUTE_PATH} from '../../routes';

const NAV_ITEM = [
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`,
        title: '报告管理'
    },
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}`,
        title: '教师管理'
    }
];

const style = _importLess('./index', __dirname);
class Dashboard extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
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

const selector = () => ({});

export = connect(selector)(Dashboard);