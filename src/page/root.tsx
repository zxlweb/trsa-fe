/**
 * @fileOverview Root组件
 * @author Max
 **/

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../base';
import * as moment from 'moment';
// 配置moment
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// moment.updateLocale('en', {
//     relativeTime: {
//         future: '%s后',
//         past: '%s前',
//         s: '秒',
//         m: '1分钟',
//         mm: '%d分钟',
//         h: '1小时',
//         hh: '%d小时',
//         d: '1天',
//         dd: '%d天',
//         M: '1月',
//         MM: '%d月',
//         y: '1年',
//         yy: '%d年'
//     }
// });

const style = _importLess('./index', __dirname);
class Root extends BaseComponent<any, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {
        wrap.setTag('title', 'TRS后台管理系统');
        wrap.prependTagBefore('headTagClose', 'globalStyle', {href: config.get('STYLE_STATIC_PATH') + '/global.css'}, wrap.TAG_TYPE.STYLE);
        wrap.prependTagBefore('headTagClose', 'resetStyle', {href: config.get('STYLE_STATIC_PATH') + '/reset.css'}, wrap.TAG_TYPE.STYLE);
        wrap.prependTagBefore('headTagClose', 'antdStyle', {href: config.get('JS_LIB_PATH') + '/antd.min.css'}, wrap.TAG_TYPE.STYLE);
    }
    constructor(props: any) {
        super(props);
        this.state = {
            client: false
        };
    }
    componentDidMount() {
        this.setState({
            client: true
        });
        
        console.log('root did mount');

        const fastclick = require('fastclick');
        fastclick.attach(document.body);
    }
    render() {
        let debugPanel: any;
        if(this.state.client) {
            if(this.props.devTools) {
                let DevTools = this.props.devTools;
                debugPanel = 
                <div>
                    <DevTools />
                </div>;
            }
        }
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                {this.props.children}
                {debugPanel}
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(Root);