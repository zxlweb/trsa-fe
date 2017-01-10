/**
 * @fileOverview 跟微信吊access_token, jsapi_ticket之类相关的管理
 * @author Max
 **/

import config from '../config';

const ACCESS_TOKEN_EXPIRES = 7100 * 1000;

let jsapi_ticket: string;

// 初始化
export const init = () => {
    if(config.getIn(['@WECHAT', 'APP_ID']) !== '' && config.getIn(['@WECHAT', 'APP_SECRET']) !== '') {
        console.log('wechat js sdk init success');
        refresh();
        startInterval();
    }
};

function refresh() {
    _https.get(`${config.getIn(['@WECHAT', 'GET_GLOBAL_ACCESS_TOKEN'])}?grant_type=client_credential&appid=${config.getIn(['@WECHAT', 'APP_ID'])}&secret=${config.getIn(['@WECHAT', 'APP_SECRET'])}`, true)
          .then(data => {
              const json = JSON.parse(data);
              return _https.get(`${config.getIn(['@WECHAT', 'GET_JS_API_TICKET'])}?access_token=${json.access_token}&type=jsapi`, true);
          })
          .then(data => {
              const json = JSON.parse(data);
              jsapi_ticket = json.ticket;
          }).catch(err => {
              console.error(err);
          });
}

function startInterval() {
    setInterval(refresh, ACCESS_TOKEN_EXPIRES);
}

export const getJSAPITicket = () => jsapi_ticket;
