/**
 * @fileOverview User action
 * @author Max
 **/

import {createAction} from './utils';
import ACTION_TYPE from '../const/action-type';
import {validate} from '../utils/validator';

export const logIn = createAction(ACTION_TYPE.USER_LOG_IN, null, () => ({
    validator: {
        account: [
            {
                func: (account: string) => account === 'admin',
                msg: '用户名或密码错误'
            }
        ],
        password: {
            func: (password: string) => password === 'trs2017',
            msg: '用户名或密码错误'
        }
    }
}));
export const logOut = createAction(ACTION_TYPE.USER_LOG_OUT);
