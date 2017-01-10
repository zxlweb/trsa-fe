/**
 * @fileOverview server-side http 请求, 产出Promise
 *               自动解析JSON数据，服务器返回的数据结构顶层为{code: int(0为成功，其余为错误码), data/error}
 *               附带桩方法
 * @author Max
 */

import * as http from 'http';
import * as https from 'https';
import * as querystring from 'querystring';
import REQUEST from './request';
import * as URL from 'url';

let _http: HTTP, _https: HTTPS;

class HTTP_PARENT extends REQUEST {
    private _method: any
    constructor(params: any, protocol: string, method: any) {
        super(params, protocol);
        this._protocol = protocol;
        this._method = method;
    }
    _getPromise(url: string, raw?: boolean) {
        return new Promise((resolve, reject) => {
            console.log(`new ${this._protocol.toUpperCase()} GET:`, url);
            this._method.get(url, (res: any) => {
                this._dataHandler(url, res, resolve, reject, raw);
            }).on('error', reject);
        });
    }
    _postPromise(url: string, content: any, options?: any, raw?: boolean) {
        const _content = querystring.stringify(content);
        const urlObj = URL.parse(url);
        let optionsReal = options || {};
        let _options = {
            method: 'POST',
            headers: {
                'Content-Type': optionsReal['Content-Type'] || 'application/x-www-form-urlencoded',
                'Content-Length': _content.length
            },
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path
        };

        return new Promise((resolve, reject) => {
            console.log(`new ${this._protocol.toUpperCase()} POST:`, url);
            const req = this._method.request(_options, (res: any) => {
                this._dataHandler(url, res, resolve, reject, raw);
            });

            req.on('error', reject);

            req.write(_content);
            req.end();
        });
    }
    private _dataHandler(url: string, res: any, resolve: Function, reject: Function, raw?: boolean) {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', function(chunk: string) {
            body += chunk;
        });
        res.on('end', () => {
            let json: any;
            if(!raw) {
                try {
                    json = JSON.parse(body);
                } catch(e) {
                    console.error(body);
                    reject(e);
                    return;
                }
            } else {
                json = body;
            }

            if(!raw) {
                this._dataFlag(url, json, resolve, reject);
            } else {
                resolve(json);
            }
        });
        res.on('error', reject);
    }
}

class HTTP extends HTTP_PARENT{
    constructor(params: any) {
        super(params, 'http', http);
        http.get
    }
}
class HTTPS extends HTTP_PARENT {
    constructor(params: any) {
        super(params, 'https', https);
    }
}

export const initHTTP = (params: any) => {
    _http = new HTTP(params); 
    return _http; 
};
export const initHTTPS = (params: any) => {
    _https = new HTTPS(params);  
    return _https;
};