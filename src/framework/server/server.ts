/**
 * @fileOverview 服务器入口
 * @author Max
 **/

import * as express from 'express';
import '../utils/less-loader';
import config from './config';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import Page from './page';
import * as env from './utils/env';

import WechatRouter =  require('./wechat');
import WechatJSAPI = require('./wechat/jsapi');
import * as wechatManager from './wechat/wechat-manager';

import getRequestMethod from '../utils/iso-request';
const requestMethods = getRequestMethod(config);
global._http = requestMethods.http;
global._https = requestMethods.https;

import retina, {fNormal} from '../utils/retina';
retina(config.get('RETINA_DEFAULT_RATIO'));
global.fNormal = fNormal;

if(env.prod()) {
    wechatManager.init();
}

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", config.get('CROSSDOMAIN'));
    next();
});

// 静态资源
app.use('/' + config.get('DIST_PATH'), express.static(config.get('DIST_PATH')));
app.use('/' + config.get('DIST_PATH'), function(req, res, next) {
    res.status(404).end('Static File Not Found'); 
});

// 桩
if(env.dev()) {
    const StubMiddleware = require('./stub');
    app.use('/stub', StubMiddleware);
}

// 图片存储服务
if(config.getIn(['IMAGE_UPLOAD', 'ENABLE'])) {
    const ImageUploadMiddleware = require('./image-upload');
    app.use(config.getIn(['IMAGE_UPLOAD', 'PATH']), ImageUploadMiddleware);
}

// Wechat
if(config.getIn(['@WECHAT', 'ENABLE'])) {
    app.use('/wechat-auth', WechatRouter);
    app.use('/wechat-jsapi', WechatJSAPI);
}

// 页面
app.use('/', Page);


app.listen(config.get('PORT'));

console.log(`listen to ${config.get('PORT')}`);
