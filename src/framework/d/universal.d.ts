declare var __WEBPACK_DEV__: boolean;

interface ensureCallback {
    (require: NodeRequire): void
}
interface NodeRequire {
    ensure(dep: Array<string>, callback: ensureCallback): void
}

interface ImportLess {
    (path: string, dirname: string): string
}

interface FNormal {
    (input: string): string
}

interface WechatSDKSetup {
    (apiList: string[]): void
}
interface WX {
    ready(callback: Function): void
    config(param: any): void
    onMenuShareTimeline(param: any): void
    onMenuShareAppMessage(param: any): void
    onMenuShareQQ(param: any): void
    onMenuShareWeibo(param: any): void
    onMenuShareQZone(param: any): void
    hideMenuItems({menuList: []}): void
    showMenuItems({menuList: []}): void
}

declare module NodeJS {
    interface Global {
        _importLess: ImportLess,
        _http: REQUEST,
        _https: REQUEST,
        fNormal: FNormal

        __IMAGE_STATIC_PATH__: string
        __APP__: string
        __IMAGE_UPLOAD_PATH__: string
        __IMAGE_UPLOAD_ADD_PATH__: string
        __IMAGE_UPLOAD_DELETE_PATH__: string
    }
}
interface Window {
    _http: REQUEST,
    _https: REQUEST,
    _storage: STORAGE,
    fetch: any,
    fNormal: FNormal,
    _wechatSDKSetup: WechatSDKSetup
}

declare var _importLess: ImportLess;
declare var _http: REQUEST;
declare var _https: REQUEST;
declare var _storage: STORAGE;
declare var fNormal: FNormal;
declare var wx: WX;
declare var _wechatSDKSetup: WechatSDKSetup;