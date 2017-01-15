/**
 * @fileOverview ad actions
 * @author Max
 */

import {createAction} from 'redux-actions';
import ACTION_TYPE from '../const/action-type';
import REQUEST from '../const/request';
import {
    createGet,
    createUpdate,
} from './action-factory';
import AdModel from '../a-model/ad';
const model = new AdModel();

export const get = createGet(ACTION_TYPE.GET_AD_CONFIG, REQUEST.GET_AD_CONFIG);
export const update = createUpdate(ACTION_TYPE.UPDATE_AD_CONFIG, model.getRequestPrefix(), REQUEST.UPDATE_AD_CONFIG);
