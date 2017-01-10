/**
 * @fileOverview action creator
 * @author Max
 **/

import {createAction as createFSA} from 'redux-actions';
import cloneDeep = require('lodash.clonedeep');
import merge = require('lodash.merge');

export function createAction(actionType: string, payloadCreator?: any, metaCreator?: any, requestCreator?: any) {
    return (...args: any[]) => {
        let oriFSA: any;
        if(requestCreator) {
            const realPayloadCreator = payloadCreator === null ? (payload: any) => payload : payloadCreator;

            oriFSA = createFSA(actionType, realPayloadCreator, metaCreator)(...args);
            if(oriFSA.payload === undefined) {
                oriFSA.payload = {};
            } else if(typeof oriFSA.payload !== 'object') {
                oriFSA.payload = {payload: oriFSA.payload};
            }
            let oriPayload = cloneDeep(oriFSA.payload);
            oriFSA.payload.thunk = (dispatch: any) => {
                let requestPayload = requestCreator(...args);
                dispatch({
                    type: actionType,
                    payload: requestPayload,
                    meta: merge(oriPayload, oriFSA.meta, {disableValidate: true})
                });
                return requestPayload;
            };
        } else {
            oriFSA = createFSA(actionType, payloadCreator, metaCreator)(...args);
        }

        return oriFSA;
    };
}
