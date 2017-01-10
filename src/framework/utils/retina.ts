/**
 * @fileOverview Retina解决方案
 * @author Max
 **/

const RETINA_SIGN = '@';
const RETINA_RATIO = {
    RATIO_1X: '',
    RATIO_2X: RETINA_SIGN + '2x',
    RATIO_3X: RETINA_SIGN + '3x'
};
const mediaQuery3x = '(-webkit-min-device-pixel-ratio: 2.5),' +
                 '(min--moz-device-pixel-ratio: 2.5), ' +
                 '(-o-min-device-pixel-ratio: 5/2), ' +
                 '(min-device-pixel-ratio: 2.5), ' +
                 '(min-resolution: 2.5dppx), ' +
                 '(min-resolution: 400dpi)';
const mediaQuery2x = '(-webkit-min-device-pixel-ratio: 1.5),' +
                  '(min--moz-device-pixel-ratio: 1.5), ' +
                  '(-o-min-device-pixel-ratio: 3/2), ' +
                  '(min-device-pixel-ratio: 1.5), ' +
                  '(min-resolution: 1.5dppx), ' +
                  '(min-resolution: 240dpi)';

// 初始化Retina，检测当前屏幕ratio
let _devicePixelRatio: string;
let _ratio: number;
export default function init(ratio?: string) {
    checkDevicePixelRatio(ratio);
}
export const getRatio = () => _ratio;

// 使用media query检测屏幕ratio
function checkDevicePixelRatio(ratio?: string) {

    if(typeof window === 'undefined') {
        _devicePixelRatio = ratio || RETINA_RATIO.RATIO_1X;
        _ratio = parseInt(ratio, 10) || 1;
        return;
    } 

    let windowDevicePixelRatio = window.devicePixelRatio ||
                              window.screen.deviceXDPI / window.screen.logicalXDPI;
    if (windowDevicePixelRatio >= 2.5) {
        _devicePixelRatio = RETINA_RATIO.RATIO_3X;
        _ratio = 3;
        return;
    } else if(windowDevicePixelRatio >= 1.5) {
        _devicePixelRatio = RETINA_RATIO.RATIO_2X;
        _ratio = 2;
        return;
    }

    if (window.matchMedia && window.matchMedia(mediaQuery3x).matches) {
        _devicePixelRatio = RETINA_RATIO.RATIO_3X;
        _ratio = 3;
        return;
    } else if(window.matchMedia && window.matchMedia(mediaQuery2x).matches) {
        _devicePixelRatio = RETINA_RATIO.RATIO_2X;
        _ratio = 2;
        return;
    }

    _ratio = 1;
    _devicePixelRatio = RETINA_RATIO.RATIO_1X;
}

// 普通filter，添加@2x,@3x等
export function fNormal(input: string) {
    var pieces = input.split('.');
    pieces[pieces.length - 2] += _devicePixelRatio;
    var result = pieces.join('.');

    return result;
}
