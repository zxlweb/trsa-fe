/**
 * @fileOverview Teacher Model
 * @author Max
 */

import {EDIT_TYPE, FIELD_TYPE} from './enum';
import {default as BaseModel, PropertiesInterface, FieldDefinition} from './base';
import * as moment from 'moment';
import * as React from 'react';

const PROPERTIES: {
    name: FieldDefinition,
    img: FieldDefinition
} = {
    name: {
        key: 'name',
        title: '教师名称',
        newableMainKey: true,
        type: FIELD_TYPE.STRING,
        inputType: EDIT_TYPE.INPUT_STRING,
        required: true
    },
    img : {
        key: 'head_icon',
        title: "教师头像",
        type: FIELD_TYPE.IMAGE,
        inputType: EDIT_TYPE.IMAGE,
        render: (input: any) => <img className="teacher-head-icon" src={input} alt=""/>,
        required: true,
        imgUploadDirectory: 'xes_trs/teacher_head'
    }
}
export default class TeacherModel extends BaseModel implements PropertiesInterface {
    p = PROPERTIES
    constructor() {
        super(PROPERTIES, 'teacher');
    }
}