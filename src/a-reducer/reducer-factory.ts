/**
 * @fileOverview reducer factory
 * @author Max
 **/

import * as Immutable from 'immutable';
import {normalize, schema} from 'normalizr';

export const createList = (dataKey: string, mainKey?: string, sorter?: (dataIndex: any[], data: any) => any[]) => (state: any, action: any) => {
    const modelSchema = new schema.Entity('model', {}, {idAttribute: mainKey || 'id'});
    const normalizedData = normalize(action.payload[dataKey] || [], [modelSchema]);
    const result = state.set('dataIndex', Immutable.fromJS(sorter ? sorter(normalizedData.result, normalizedData.entities.model) : normalizedData.result))
                        .set('data', Immutable.fromJS(normalizedData.entities.model || {}))
                        .set('inited', true);
    return result;
};
export const createSave = (dataKey: string, payloadProperties: string[]) => (state: Immutable.Map<any, any>, action: any) => {
    let toAddObj: any= {};
    payloadProperties.forEach(item => {
        toAddObj[item] = action.payload[dataKey][item];
    });
    const id = action.payload[dataKey].id;
    const result = state.update('dataIndex', list => list.push(id))
                        .setIn(['data', id + ''], Immutable.Map({
                            ...toAddObj,
                            ...action.meta
                        }));
    return result;
};
export const createGetSingle = (dataKey: string) => (state: Immutable.Map<any, any>, action: any) => {
    return state.set('tempData', Immutable.Map(action.payload[dataKey]))
                .mergeIn(['data', action.meta.id + ''], Immutable.Map(action.payload[dataKey]));
};
// export const createTransaction = (start, submit, rollback) => ({
//     [start](state, action) {
//         const result = state.set('transaction', state);
//         return result;
//     },
//     [submit](state, action) {
//         const result = state.set('transaction', undefined);
//         return result;
//     },
//     [rollback](state, action) {
//         const backup = state.get('transaction') || state;
//         const result = backup;
//         return result;
//     }
// });
export const createDelete = () => (state: any, action: any) => {
    const index = state.get('dataIndex').indexOf(action.meta.id);
    const result = state.deleteIn(['dataIndex', index]);
    return result;
};
// export const createPush = () => (state, action) => {
//     const result = state.setIn(['data', action.payload.id + '', action.payload.key], action.payload.value)
//                         .setIn(['data', action.payload.id + '', 'isModified'], true);
//     return result;
// };
export const createUpdate = () => (state: Immutable.Map<any, any>, action: any) => {
    let result = state;
    for(let i in action.meta) {
        result = result.setIn(['data', action.meta.id + '', i], action.meta[i]);
    }
    return result;
};
