/**
 * @fileOverview action factory
 * @author Max
 */

import {createAction} from './utils';
import ACTION_TYPE from '../const/action-type';

export const createGetAll = (action: string, requestURL: string) => createAction(action, null, null, () => _http.get(requestURL));
export const createGetAllStub = (action: string, requestURL: string) => createAction(action, null, null, () => _http.getStub(requestURL));
export const createSave = (action: string, requestURL: string) => createAction(action, null, (params: any) => params, (params: any) => _http.post(requestURL, params));
export const createSaveStub = (action: string, requestURL: string) => createAction(action, null, (params: any) => params, (params: any) => _http.postStub(requestURL, params));
export const createDelete = (action: string, requestURL: string) => createAction(action, null, (id: number) => ({id}), (id: number) => _http.post(requestURL, {id}));
export const createDeleteStub = (action: string, requestURL: string) => createAction(action, null, (id: number) => ({id}), (id: number) => _http.postStub(requestURL, {id}));
export const createGet = (action: string, requestURL: string) => createAction(action, null, (id: number) => ({id}), (id: number) => _http.get(`${requestURL}?id=${id}`));
export const createGetStub = (action: string, requestURL: string) => createAction(action, null, (id: number) => ({id}), (id: number) => _http.getStub(`${requestURL}?id=${id}`));
export const createUpdate = (action:string, requestPrefix: string, requestURL: string, mainKey?: string) => 
createAction(action, (id: number, params: any) => ({...params, id}), (id: number, params: any) => ({...params, id}), (id: number, params: any) => {
    let content: any = {};
    for(let i in params) {
        content[`${requestPrefix}.${i}`] = params[i];
    }
    content[mainKey ? `${requestPrefix}.${mainKey}` : `${requestPrefix}.id`] = id;
    return _http.post(requestURL, content);
});
export const createUpdateStub = (action:string, requestPrefix: string, requestURL: string) => createAction(action, null, (id: number, params: any) => ({...params, id}), (id: number, params: any) => _http.postStub(requestURL, {...params, id}));
// export const createPureAction = (action) => createAction(action);
// export const createPush = (action) => createAction(action, (id, key, value) => ({id, key, value}));
// export const createTransaction = (start, submit, rollback) => ({
//     startTransaction: createAction(start),
//     submitTransaction: createAction(submit),
//     rollback: createAction(rollback)
// });
