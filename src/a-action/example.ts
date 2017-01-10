/**
 * @fileOverview action creator factory method example
 * @author Max
 **/

import {createAction} from './utils';
import ACTION_TYPE from '../const/action-type';
import {validate, notEmptyValidator, phoneValidator} from '../utils/validator';

const normalActionValidators = {
    foo: {
        func: notEmptyValidator,
        msg: 'foo不能为空'
    },
    bar: [
        {
            func: notEmptyValidator,
            msg: 'bar不能为空'
        },
        {
            func: phoneValidator,
            msg: '非法的手机号'
        }
    ]
};

// export const normalAction =  createAction(ACTION_TYPE.NORMAL, (payload: any) => payload, () => ({
//     validator: normalActionValidators
// }));

// // validator -> thunk
// export const asyncAction = createAction(ACTION_TYPE.ASYNC, (payload: any) => ({
//     foo: payload
// }), () => ({
//     validator: {
//         foo: {
//             func: notEmptyValidator,
//             msg: 'foo不能为空'
//         }
//     }
// }), (a: any, b: any) => {console.log(a,b);return _ajax.getStub('/example');});
