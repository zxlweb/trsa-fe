/**
 * @fileOverview Report reducers
 * @author Max
 */

import {createReducer} from './utils';
import ACTION_TYPE from '../const/action-type';
import * as Immutable from 'immutable';
import {createList, createDelete, createSave, createGetSingle, createUpdate} from './reducer-factory'
import ReportModel from '../a-model/report';
const model = new ReportModel();

/**
 * 数据结构
 * report: {
 *     dataIndex: [id],
 *     data: {
 *         id: {
 *             ...,
 *             isModified: boolean
 *         }
 *     }，
 *     transaction: Immutable
 *     inited: boolean,
 *     tempData: {
 * 
 *     }
 * }
 */

const report = createReducer(Immutable.fromJS({
    dataIndex: [],
    data: {}
}), {
    [ACTION_TYPE.LIST_REPORT]: createList('report'),
    [ACTION_TYPE.DELETE_REPORT]: createDelete(),
    [ACTION_TYPE.SAVE_REPORT]: createSave('report', ['id', 'ready']),
    [ACTION_TYPE.GET_SINGLE_REPORT]: createGetSingle('report'),
    [ACTION_TYPE.UPDATE_REPORT]: createUpdate()
});

export default report;