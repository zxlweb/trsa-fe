/**
 * @fileOverview node环境下直接读取css源文件
 * @author Max
 */

import * as fs from 'fs';
import * as path from 'path';

global._importLess = function(filePath, dirname) {
    // node环境
    let filePathObj = path.parse(filePath);
    let cssFilePath = path.join(dirname, filePathObj.dir, filePathObj.name + '.css');
    try {
        let content = fs.readFileSync(cssFilePath, 'utf-8');
        return content;
    } catch (e) {
        console.error(e);
    }
    return '';
};