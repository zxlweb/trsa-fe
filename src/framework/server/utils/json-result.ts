/**
 * @fileOverview json返回对象构造器
 * @author Max
 */

export function error(msg: string) {
    return {
        code: 1,
        msg
    };
};
export function success(data: any) {
    return {
        code: 0,
        data
    };
};