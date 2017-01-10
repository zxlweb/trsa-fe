/**
 * @fileOverview 获取js signature
 * @author Max
 **/

import * as express from 'express';
import * as wechatManager from './wechat-manager';
import sign from './sign';
import {success} from '../utils/json-result';

const router = express.Router();

router.all('*', (req, res, next) => {
    const url = req.query.url;

    res.json(success(sign(wechatManager.getJSAPITicket(), url)));
});

export = router;
