/**
 * @fileOverview 桩机制
 * @author Max
 */

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config';
import * as jr from '../utils/json-result';
const router = express.Router();

router.all('*', (req, res, next) => {
    const stubFilePath = path.join(
        process.cwd(), 
        config.getIn(['STUB_SERVER', 'FILE_DIR']), 
        req.path.substr(1).split('/').join('.') + '.json'
    );
    
    console.log(stubFilePath);
    
    let content: any;
    try{
        content = JSON.parse(fs.readFileSync(stubFilePath, {encoding: 'utf8'}));
    } catch(e) {
        content = jr.error('404 Not Found');
    }

    res.json(content);
});

export = router;