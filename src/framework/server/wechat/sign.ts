import jsSHA = require('jssha');
import config from '../config';

var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000 + '') + '';
};

var raw = function (args: any) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs: any = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket: string, url: string) {
  var ret: {[key: string]: any} = {
    jsapi_ticket: jsapi_ticket,
    noncestr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  var shaObj = new jsSHA('SHA-1', 'TEXT');
  shaObj.update(string);
  ret['signature'] = shaObj.getHash('HEX');
  ret['app_id'] = config.getIn(['@WECHAT', 'APP_ID']);

  return ret;
};

export default sign;
