/**
 * @fileOverview Site header
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../base';
import {Row, Col} from 'antd';
import * as userActions from '../../a-action/user';
import {browserHistory} from 'react-router';

const style = _importLess('./index', __dirname);
class SiteHeader extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    handleLogOut() {
        const {dispatch} = this.props;
        dispatch(userActions.logOut());
        _storage.$remove('user');
        browserHistory.push('/');
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <header>
                    <Row>
                        <Col span={6} className="title">
                            <h1>TRS后台管理系统</h1>
                        </Col>
                        <Col span={17} className="user-section">
                            <a onClick={this.handleLogOut.bind(this)}>退出登录</a>
                        </Col>
                    </Row>
                </header>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(SiteHeader);