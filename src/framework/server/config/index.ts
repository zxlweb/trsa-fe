/**
 * @fileOverview 全局配置
 * @author Max
 */

import * as fs from 'fs';
import * as Immutable from 'immutable';
import * as env from '../utils/env';
import * as path from 'path';

const DEV_CONF_PATH = path.join(process.cwd(), 'conf/dev.json');
const TEST_CONF_PATH = path.join(process.cwd(), 'conf/test.json');
const PROD_CONF_PATH = path.join(process.cwd(), 'conf/prod.json');

// 读取配置文件
let config: Immutable.Map<any, any>;
try {
    // 根据proceess.env.NODE_ENV判断开发与生产环境
    if(env.prod()) {
        config = Immutable.fromJS(JSON.parse(fs.readFileSync(PROD_CONF_PATH, {encoding: 'utf8'})));
    } else if(env.test()) {
        config = Immutable.fromJS(JSON.parse(fs.readFileSync(TEST_CONF_PATH, {encoding: 'utf8'})));
    } else {
        config = Immutable.fromJS(JSON.parse(fs.readFileSync(DEV_CONF_PATH, {encoding: 'utf8'})));
    }
} catch (error) {
   console.error(error.stack);
}

global.__IMAGE_STATIC_PATH__ = config.get('IMAGE_STATIC_PATH');
global.__APP__ = config.get('APP');
global.__IMAGE_UPLOAD_PATH__ = config.getIn(['IMAGE_UPLOAD', 'PATH']);
global.__IMAGE_UPLOAD_ADD_PATH__ = config.getIn(['IMAGE_UPLOAD', 'ADD_PATH']);
global.__IMAGE_UPLOAD_DELETE_PATH__ = config.getIn(['IMAGE_UPLOAD', 'DELETE_PATH']);

export default config;
