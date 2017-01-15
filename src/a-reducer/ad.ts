/**
 * @fileOverview ad reducers
 * @author Max
 */

import {createReducer} from './utils';
import ACTION_TYPE from '../const/action-type';
import * as Immutable from 'immutable';
import AdModel from '../a-model/ad';
const model = new AdModel();

/**
 * 数据结构
 * ad: {
 *     
 * }
 */

const ad = createReducer(Immutable.fromJS({
}), {
    [ACTION_TYPE.GET_AD_CONFIG]: (state: Immutable.Map<string, string>, action: any) => {
        return state.set(model.p.img.key, action.payload[model.p.img.key])
                    .set(model.p.url.key, action.payload[model.p.url.key]);
    },
    [ACTION_TYPE.UPDATE_AD_CONFIG]: (state: Immutable.Map<string, string>, action: any) => {
        return state.set(model.p.img.key, action.meta[model.p.img.key])
                    .set(model.p.url.key, action.meta[model.p.url.key]);
    },
});

export default ad;