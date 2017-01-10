/**
 * @fileOverview 设备检测
 * @author Max
 */

import MobileDetect = require('mobile-detect');

export const getDeviceVars = (userAgent: string) => {
    const md = new MobileDetect(userAgent);
    
    return {
        __PHONE__: md.phone() !== null,
        __TABLET__: md.tablet() !== null,
        __MOBILE__: md.mobile() !== null,
        __OS__: md.os()  
    };
};