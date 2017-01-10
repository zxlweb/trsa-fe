/**
 * @fileOverview HTML页面head部分和尾部
 * @author Max
 **/

import cloneDeep = require('lodash.clonedeep');
import remove = require('lodash.remove');
import findIndex = require('lodash.findindex');
import reduce = require('lodash.reduce');
import * as env from '../server/utils/env';
import config from '../server/config';

const head = {
    doctype: '<!DOCTYPE html>',
    htmlTagOpen: '<html lang="zh-cmn-Hans">',
    headTagOpen: '<head>',
    titleTagOpen: '<title>',
    title: '',
    titleTagClose: '</title>',
    charset: '<meta charset="utf-8" >',
    favicon: '<link rel="shortcut icon" href="/dist/favicon.ico" />',
    httpEquiv: '<meta http-equiv="X-UA-Compatible" content="IE=edge" >',
    viewport: '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" >',
    renderer: '<meta name="renderer" content="webkit" >',
    formatDetection: '<meta name="format-detection" content="telephone=no" >',
    headTagClose: '</head>',
    bodyTagOpen: '<body>',
    rootTagOpen: '<div id="root">'
};

const REACT_VERSION = '15.4.1';
const IMMUTABLE_VERSION = '3.8.1';

const CDN_INSURANCE = {
    'React': `${config.get('JS_LIB_PATH')}/react-with-addons-${REACT_VERSION}.min.js`,
    'ReactDOM': `${config.get('JS_LIB_PATH')}/react-dom-${REACT_VERSION}.min.js`,
    'Immutable': `${config.get('JS_LIB_PATH')}/immutable-${IMMUTABLE_VERSION}.min.js`
};

const bottom = {
    rootTagClose: '</div>',
    react: env.notDev() ? `<script type="text/javascript" src="//cdn.bootcss.com/react/${REACT_VERSION}/react-with-addons.min.js"></script>` : `<script type="text/javascript" src="${config.get('JS_LIB_PATH')}/react-with-addons-${REACT_VERSION}.js"></script>`,
    reactDOM: env.notDev() ? `<script type="text/javascript" src="//cdn.bootcss.com/react/${REACT_VERSION}/react-dom.min.js"></script>` : `<script type="text/javascript" src="${config.get('JS_LIB_PATH')}/react-dom-${REACT_VERSION}.min.js"></script>`,
    immutable: env.notDev() ? `<script type="text/javascript" src="//cdn.bootcss.com/immutable/${IMMUTABLE_VERSION}/immutable.min.js"></script>` : `<script type="text/javascript" src="${config.get('JS_LIB_PATH')}/immutable-${IMMUTABLE_VERSION}.min.js"></script>`,
    cookie: env.notDev() ? '<script type="text/javascript" src="//cdn.bootcss.com/js-cookie/2.0.3/js.cookie.min.js"></script>' : `<script type="text/javascript" src="${config.get('JS_LIB_PATH')}/js-cookie-2.0.3.min.js"></script>`,
    commons: `<script type="text/javascript" src="${config.get('JS_STATIC_PATH')}/page/commons.js"></script>`,
    entry: `<script type="text/javascript" src="${config.get('JS_STATIC_PATH')}/page/entry.js"></script>`,
    bodyTagClose: '</body>',
    htmlTagClose: '</html>'
};

enum TAG_TYPE {
    SCRIPT, STYLE, META
};

interface KeyPair {
    key: string,
    value: string
}

export default class HTMLWrap {
    private _head: any
    private _bottom: any
    private _cdnInsurance: any
    public TAG_TYPE = TAG_TYPE
    constructor() {
        let convertObjToArray = (objToConvert: any) => {
            let obj = cloneDeep(objToConvert);
            let result: Array<KeyPair>= [];
            for(let i in obj) {
                result.push({
                    key: i,
                    value: obj[i]
                });
            }
            return result;
        };
        this._head =  convertObjToArray(head);
        this._bottom = convertObjToArray(bottom);
        this._cdnInsurance = convertObjToArray(CDN_INSURANCE);

        this.prependTagBefore('entry', 'cdnInsurance', {
            content: this._getCDNInsuranceSentence()
        }, TAG_TYPE.SCRIPT);
    }
    addCDNInsurance(globalVar: string, path: string) {
        this._cdnInsurance.push({
            key: globalVar,
            value: path
        });

        this.removeTag('cdnInsurance');
        this.prependTagBefore('entry', 'cdnInsurance', {
            content: this._getCDNInsuranceSentence()
        }, TAG_TYPE.SCRIPT);
    }
    getHead() {
        let result = reduce(this._head, (sum: string, item: KeyPair) => {
            return sum + item.value;
        }, '');

        return result;
    }
    getBottom() {
        let result = reduce(this._bottom, (sum: string, item: KeyPair) => {
            return sum + item.value;
        }, '');

        return result;
    }
    removeTag(key: string) {
        remove(this._head, (item: KeyPair) => {
            return item.key === key;
        });
        remove(this._bottom, (item: KeyPair) => {
            return item.key === key;
        });
    }
    setTag(key: string, value: string) {
        let index = this._findIndex(key);

        let obj = this._head[index] || this._bottom[index - this._head.length];
        if(obj !== undefined) {
            obj.value = value;
        }
    }
    getTag(key: string) {
        let index = this._findIndex(key);

        let obj = this._head[index] || this._bottom[index - this._head.length];
        let result = obj !== undefined ? obj.value : undefined;
        return result;
    }
    injectGlobalVar(obj: any) {
        let index = this._findIndex('headTagOpen');
        let tag = '<script type="text/javascript">\n';
        for(let i in obj) {
            if(typeof obj[i] === 'string') {
                tag += `var ${i} = '${obj[i]}';\n`;
            } else {
                tag += `var ${i} = ${obj[i]};\n`;
            }
        }
        tag += '</script>';

        this._head.splice(index + 1, 0, {
            key: 'globalVar',
            value: tag
        });
    }
    appendTagAfter(key: string, tagKey: string, valueObj: any, tagType: TAG_TYPE) {
        let index = this._keyCheck(key, tagKey);
        let tag = this._generateTag(valueObj, tagType);

        if(index < this._head.length) {
            this._head.splice(index + 1, 0, {
                key: tagKey,
                value: tag
            });
        } else {
            this._bottom.splice(index - this._head.length + 1, 0, {
                key: tagKey,
                value: tag
            });
        }
    }
    prependTagBefore(key: string, tagKey: string, valueObj: any, tagType: TAG_TYPE) {
        let index = this._keyCheck(key, tagKey);
        let tag = this._generateTag(valueObj, tagType);

        if(index < this._head.length) {
            this._head.splice(index, 0, {
                key: tagKey,
                value: tag
            });
        } else {
            this._bottom.splice(index - this._head.length, 0, {
                key: tagKey,
                value: tag
            });
        }
    }
    private _generateTag(valueObj: any, tagType: TAG_TYPE) {
        let tag: string;
        switch (tagType) {
            case TAG_TYPE.SCRIPT:
                 if(valueObj.src) {
                     tag = `<script type="text/javascript" src="${valueObj.src}"></script>`;
                 } else {
                     tag = `<script type="text/javascript">${valueObj.content}</script>`;
                 }
                 break;
            case TAG_TYPE.STYLE:
                 tag = `<link rel="stylesheet" href="${valueObj.href}" />`;
                 break;
            case TAG_TYPE.META:
                 tag = '<meta ';
                 for(let i in valueObj) {
                     tag += `${i}="${valueObj[i]}" `;
                 }
                 tag += '/>';
                 break;
            default:
                throw new Error('未定义的TAG_TYPE');
        }

        return tag;
    }
    private _keyCheck(key: string, tagKey: string) {
        let index = this._findIndex(key);
        let indexDuplicated = this._findIndex(tagKey);

        if(indexDuplicated !== -1) {
            throw new Error('不能插入重复的标签key');
        }
        if(index === -1) {
            throw new Error('未找到已有的key');
        }

        return index;
    }
    private _findIndex(key: string) {
        let allWrap = this._head.concat(this._bottom);
        let index = findIndex(allWrap, (item: KeyPair) => {
            return item.key === key;
        });

        return index;
    }
    private _getCDNInsuranceSentence() {
        let cdnInsuranceSentences = reduce(this._cdnInsurance, (sum: string, item: KeyPair) => {
            return sum + `if(typeof ${item.key} === "undefined"){document.write(unescape(\'%3Cscript src=\"${item.value}\"%3E%3C/script%3E\'));}\n`;
        }, '');

        return cdnInsuranceSentences;
    }
}
