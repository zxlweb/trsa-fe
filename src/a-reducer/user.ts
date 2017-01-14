/**
 * @fileOverview User reducer
 * @author Max
 **/

import {createReducer} from './utils';
import ACTION_TYPE from '../const/action-type';
import * as Immutable from 'immutable';
/**
 * 数据结构
 * user: {
 *     account: string
 * }
 */

const user = createReducer(Immutable.Map(), {
    [ACTION_TYPE.USER_LOG_IN](state: any, action: any) {
        let result = state.set('account', action.payload.account);
        return result;
    },
    [ACTION_TYPE.USER_LOG_OUT](state: any, action: any) {
        let result = state.clear();
        return result;
    }
});

export default user;
