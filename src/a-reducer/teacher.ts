/**
 * @fileOverview Teacher reducers
 * @author Max
 */

import {createReducer} from './utils';
import ACTION_TYPE from '../const/action-type';
import * as Immutable from 'immutable';
import {createList, createDelete, createSave, createGetSingle, createUpdate} from './reducer-factory'
import TeacherModel from '../a-model/teacher';
const model = new TeacherModel();

/**
 * 数据结构
 * teacher: {
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

const teacher = createReducer(Immutable.fromJS({
    dataIndex: [],
    data: {}
}), {
    [ACTION_TYPE.LIST_TEACHER]: createList('teacher', model.p.name.key),
    [ACTION_TYPE.DELETE_TEACHER]: createDelete(),
    [ACTION_TYPE.SAVE_TEACHER]: createSave('teacher', []),
    [ACTION_TYPE.GET_SINGLE_TEACHER]: createGetSingle('teacher'),
    [ACTION_TYPE.UPDATE_TEACHER]: createUpdate()
});

export default teacher;