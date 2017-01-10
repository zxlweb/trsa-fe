/**
 * @fileOverview cookie-based storage, 依赖js-cookie, 支持JSON对象直接存储
 * @author Max
 **/

 import Cookies = require('cookies');

 const INITIAL_DATA_NAMESPACE = 'initialData';

 export default {
     ['$set'](key: string, obj: any) {
         let initialDataObj = Cookies.getJSON(INITIAL_DATA_NAMESPACE) || {};

         initialDataObj[key] = obj;

         Cookies.set(INITIAL_DATA_NAMESPACE, JSON.stringify(initialDataObj), {expires: 7, path: '/'});
     },
     ['$get'](key: string) {
         let initialDataObj = Cookies.getJSON(INITIAL_DATA_NAMESPACE) || {};

         return initialDataObj[key];
     },
     ['$remove'](key: string) {
         let initialDataObj = Cookies.getJSON(INITIAL_DATA_NAMESPACE) || {};
         delete initialDataObj[key];

         Cookies.set(INITIAL_DATA_NAMESPACE, JSON.stringify(initialDataObj), {expires: 7, path: '/'});
     },
     ['set'](key: string, obj: any) {
         Cookies.set(key, JSON.stringify(obj), {expires: 7, path: '/'});
     },
     ['get'](key: string) {
         return Cookies.getJSON(key);
     },
     ['remove'](key: string) {
         Cookies.remove(key, {path: '/'});
     }
 };
