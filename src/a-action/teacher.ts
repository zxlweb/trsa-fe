/**
 * @fileOverview teacher actions
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

export const getAll = createGet(ACTION_TYPE.LIST_TEACHER, REQUEST.LIST_TEACHER);
export const del = createDeleteStub(ACTION_TYPE.DELETE_TEACHER, REQUEST.DELETE_TEACHER);
export const save = createSave(ACTION_TYPE.SAVE_TEACHER, REQUEST.SAVE_TEACHER);
export const get = createGet(ACTION_TYPE.GET_SINGLE_TEACHER, REQUEST.GET_TEACHER);
export const update = createUpdate(ACTION_TYPE.UPDATE_TEACHER, REQUEST.UPDATE_TEACHER);
