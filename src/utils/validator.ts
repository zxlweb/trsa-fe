/**
 * @fileOverview 字段验证
 * @author Max
 **/

import isMobilePhone from 'validator/lib/isMobilePhone';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';

export const notEmptyValidator = (value: any) => value !== '' &&
                                          value !== undefined &&
                                          value !== null &&
                                          !(isNaN(value) && typeof value === 'number') &&
                                          !(Array.prototype.isPrototypeOf(value) && value.length === 0) &&
                                          !(typeof value === 'object' && isEmptyObj(value));
export const phoneValidator = (value: any) => isMobilePhone(value + '', 'zh-CN');
export const integerValidator = (value: any) => typeof value === 'number' && isInt(value + '');
export const floatValidator = (value: any) => typeof value === 'number' && isFloat(value + '');
export const booleanValidator = (value: any) => typeof value === 'boolean';
export const arrayValidator = (value: any) => Array.prototype.isPrototypeOf(value);

function isEmptyObj(obj: any) {
    for(let i in obj) {
        return false;
    }
    return true;
}

export const validate = (params: any, validator: any): {} => {

    for(let i in params) {
        if(validator && validator[i] !== undefined) {
            if(Array.prototype.isPrototypeOf(validator[i])) {
                for(let j in validator[i]) {
                    if(!validator[i][j].func(params[i])) {
                        return {
                            flag: false,
                            msg: validator[i][j].msg
                        };
                    }
                }
            } else {
                if(!validator[i].func(params[i])) {
                    return {
                        flag: false,
                        msg: validator[i].msg
                    };
                }
            }
        }
    }

    return {
        flag: true
    };
};

