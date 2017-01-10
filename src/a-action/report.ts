/**
 * @fileOverview report actions
 * @author Max
 */

import {createAction} from 'redux-actions';
import ACTION_TYPE from '../const/action-type';
import REQUEST from '../const/request';
import {
    createGetAll, 
    createGetAllStub, 
    createDelete, 
    createDeleteStub,
    createSave,
    createSaveStub,
    createGet,
    createGetStub,
    createUpdate,
    createUpdateStub
} from './action-factory';

export const getAll = createGetAll(ACTION_TYPE.LIST_REPORT, REQUEST.LIST_REPORT);
export const del = createDelete(ACTION_TYPE.DELETE_REPORT, REQUEST.DELETE_REPORT);
export const save = createSave(ACTION_TYPE.SAVE_REPORT, REQUEST.SAVE_REPORT);
export const get = createGet(ACTION_TYPE.GET_SINGLE_REPORT, REQUEST.GET_REPORT);
export const update = createUpdate(ACTION_TYPE.UPDATE_REPORT, REQUEST.UPDATE_REPORT);
