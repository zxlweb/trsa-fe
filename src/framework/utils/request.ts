/**
 * @fileOverview 统一HTTP网络请求父对象
 *               产出Promise对象
 *               自动解析JSON数据，服务器返回的数据结构顶层为{code: int(0为成功，其余为错误码), data/error}
 *               附带桩方法
 * @author Max
 **/

import * as URL from 'url';

abstract class REQUEST {
    protected _hostname: string
    protected _port: string
    protected _stubHostname: string
    protected _stubPort: string
    protected _protocol: string
    protected _params: any
    constructor(param: RequestParam, protocol: string) {
        this._hostname = param.hostname;
        this._port = param.port;
        this._stubHostname = param.stubHostname;
        this._stubPort = param.stubPort;
        this._protocol = protocol;

        this._params = {};
    }
    protected abstract _getPromise(url: string, raw?: boolean): Promise<any>
    protected abstract _postPromise(url: string, content: any, options?: any, raw?: boolean): Promise<any>
    get(url: string, raw: boolean) {
        const urlObj = URL.parse(encodeURI(url));
        let query = '';
        for(let i in this._params) {
            query += `${i}=${this._params[i]}&`;
        }
        query = query.substr(0, query.length - 1);
        if(query !== '') {
            urlObj.search = urlObj.search ? `${urlObj.search}&${query}` : `?${query}`;
        }

        return this._getPromise(this._urlFilter(URL.format(urlObj)), raw);
    }
    getStub(url: string) {
        return this._getPromise(this._urlStubFilter(encodeURI(url)));
    }
    post(url: string, content: any, options: any, raw: boolean) {
        for(let i in this._params) {
            content[i] = this._params[i];
        }

        return this._postPromise(this._urlFilter(encodeURI(url)), content, options, raw);
    }
    postStub(url: string, content: any) {
        return this._postPromise(this._urlStubFilter(encodeURI(url)), content);
    }
    setParam(key: string, value: any) {
        this._params[key] = value;
    }
    private _urlFilter(url: string) {
        let result = url;
        const urlObj = URL.parse(url);
        if(urlObj.hostname === null && urlObj.port === null) {
            urlObj.hostname = this._hostname;
            urlObj.port = this._port;
            urlObj.protocol = this._protocol;
            urlObj.slashes = true;

            result = URL.format(urlObj);
        }

        return result;
    }
    private _urlStubFilter(url: string) {
        let result = url;
        const urlObj = URL.parse(url);

        if(urlObj.hostname === null && urlObj.port === null) {
            urlObj.hostname = this._stubHostname;
            urlObj.port = this._stubPort;
            urlObj.protocol = this._protocol;
            urlObj.slashes = true;
            urlObj.pathname = '/stub' + urlObj.pathname;

            result = URL.format(urlObj);
        }

        return result;
    }
    protected _dataFlag(url: string, obj: any, resolve: Function, reject: Function) {
        if(obj.result_code === 0) {
            resolve(obj.content);
        } else {
            reject(obj);
            // throw new Error(`request error: ${url}`);
        }
    }
}

export default REQUEST;