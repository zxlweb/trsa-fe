/**
 * @fileOverview advertisement config
 * @author Max
 */

import {EDIT_TYPE, FIELD_TYPE} from './enum';
import {default as BaseModel, PropertiesInterface, FieldDefinition} from './base';

const PROPERTIES: {
    img: FieldDefinition,
    url: FieldDefinition
} = {
    img: {
        key: 'ad_img',
        title: '广告图片',
        type: FIELD_TYPE.IMAGE,
        inputType: EDIT_TYPE.IMAGE,
        required: true,
        imgUploadDirectory: 'xes_trs/ad'
    },
    url: {
        key: 'ad_img_redirect',
        title: '广告链接',
        type: FIELD_TYPE.STRING,
        inputType: EDIT_TYPE.URL
    }
}
export default class AdModel extends BaseModel implements PropertiesInterface {
    p = PROPERTIES
    constructor() {
        super(PROPERTIES, 'config');
    }
}