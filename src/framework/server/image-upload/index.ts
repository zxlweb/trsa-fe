/**
 * @fileOverview 图片上传服务
 * @author Max
 */

import * as express from 'express';
import config from '../config';
import {OSS} from 'aliyun-sdk';
import * as Formidable from 'formidable';
import * as fs from 'fs';
import * as jr from '../utils/json-result';
import * as fse from 'fs-extra';
import * as uuid from 'node-uuid';
import * as url from 'url';

const router = express.Router();

const oss = new OSS({
    "accessKeyId": config.getIn(['@ALIYUN', 'ACCESS_KEY_ID']),
    "secretAccessKey": config.getIn(['@ALIYUN', 'ACCESS_KEY_SECRET']),
    endpoint: `http://${config.getIn(['@ALIYUN', 'OSS_ENDPOINT'])}`,
    apiVersion: '2013-10-15'
});

router.all(config.getIn(['IMAGE_UPLOAD', 'ADD_PATH']), (req, res, next) => {
    let form = new Formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = process.cwd();
    form.maxFieldsSize = config.getIn(['IMAGE_UPLOAD', 'MAX_SIZE']);

    const directory = req.query ? req.query.directory : undefined;

    form.parse(req, function(err, fields, files) {
        let tasks: Array<Promise<any>> = [];
        if(err) {
            console.error(err);
            res.json(jr.error(err.stack));
            return;
        }
        for(let i in files) {
            tasks.push(
                new Promise((resolve, reject) => {
                    fs.readFile(files[i].path, (err, data) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                            return;
                        }

                        const key = uuid.v1();
                        oss.putObject({
                            Bucket: config.getIn(['@ALIYUN', 'BUCKET']),
                            Key: `${directory || config.getIn(['@ALIYUN', 'DIRECTORY'])}/${key}`,
                            Body: data,
                            AccessControlAllowOrigin: '',
                            ContentType: files[i].type,
                            CacheControl: 'no-cache',
                            ContentDisposition: '',
                            ContentEncoding: 'utf-8',
                            ServerSideEncryption: 'AES256',
                            Expires: undefined
                        }, function (err, data) {
                            console.log(err);
                            if (err) {
                                console.error(err);
                                reject(err);
                                return;
                            }
                            fse.removeSync(files[i].path);
                            resolve(`http://${config.getIn(['@ALIYUN', 'BUCKET'])}.${config.getIn(['@ALIYUN', 'OSS_ENDPOINT'])}/${directory || config.getIn(['@ALIYUN', 'DIRECTORY'])}/${key}`);
                        });
                    });
                })
            );
        }

        Promise.all(tasks).then(data => {
            res.json({
                "success": true,
                "file_path": data
            });
        }).catch((err) => {
            res.json(jr.error(err.stack));
        });
    });
});

router.all(config.getIn(['IMAGE_UPLOAD', 'DELETE_PATH']), (req, res, next) => {
    const toDeleteURL = req.query ? req.query.key : undefined;
    if(toDeleteURL) {
        const urlObj = url.parse(toDeleteURL);
        oss.deleteObject({
            Bucket: config.getIn(['@ALIYUN', 'BUCKET']),
            Key: urlObj.path.substr(1)
        }, (err, data) => {
            if(err) {
                res.json({
                    result_code: 1,
                    err_msg: err
                });
            } else {
                res.json({
                    result_code: 0
                });
            }
        });
    } else {
        res.json({
            result_code: 1,
            err_msg: 'key must be specified'
        });
    }
});

export = router;