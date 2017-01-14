/**
 * @fileOverview index page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../base';
import {browserHistory} from 'react-router';
import {ROUTE_PATH} from '../../routes';
import {Form, Input, Icon, Button, message} from 'antd';
const FormItem = Form.Item;
import * as userActions from '../../a-action/user';

const style = _importLess('./index', __dirname);
class Index extends BaseComponent<{
    account: string
}, {
    account?: string,
    password?: string
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {
        
    }
    constructor(props: any) {
        super(props);

        this.state = {
            account: '',
            password: ''
        };
    }
    componentDidMount() {
        const {account} = this.props;
        if(account !== undefined) {
            browserHistory.push(`/${ROUTE_PATH.DASHBOARD}`);
        }
    }
    handleEnterSubmit(e: any) {
        if(e.which === 13) {
            this.handleLogIn();
        }
    }
    handleLogIn() {
        const {dispatch} = this.props;
        let result = dispatch(userActions.logIn({
            account: this.state.account,
            password: this.state.password
        }));
        
        if(result.err === 'validator') {
            message.error(result.msg);
        } else {
            _storage.$set('user', {account: this.state.account});
            browserHistory.push(`/${ROUTE_PATH.DASHBOARD}`);
        }
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-index">
                    <h1>TRS后台管理系统</h1>
                    
                    <Form className="login-form">
                        <FormItem>
                            <Input type="text" addonBefore={<Icon type="user"></Icon>} placeholder="用户名" value={this.state.account} onChange={(e: any) => this.setState({account: e.target.value})} onKeyDown={this.handleEnterSubmit.bind(this)}></Input>
                        </FormItem>
                        <FormItem>
                            <Input type="password" addonBefore={<Icon type="lock"></Icon>} placeholder="密码"  value={this.state.password} onChange={(e: any) => this.setState({password: e.target.value})} onKeyDown={this.handleEnterSubmit.bind(this)}></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="button" onClick={this.handleLogIn.bind(this)}>登录</Button>
                        </FormItem>
                    </Form>
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

export = connect(selector)(Index);