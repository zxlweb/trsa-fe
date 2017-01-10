/**
 * @fileOverview Report Model
 * @author Max
 */

import {EDIT_TYPE, FIELD_TYPE} from './enum';
import {default as BaseModel, PropertiesInterface, FieldDefinition} from './base';
import * as moment from 'moment';

const PROPERTIES: {
    id: FieldDefinition,
    title: FieldDefinition,
    date: FieldDefinition,
    totalScore: FieldDefinition,
    totalPeople: FieldDefinition,
    pv: FieldDefinition,
    ready: FieldDefinition,
} = {
    id: {
        key: 'id',
        title: '报告编号',
        mainKey: true,
        type: FIELD_TYPE.INT
    },
    title: {
        key: 'title',
        title: '报告名称',
        type: FIELD_TYPE.STRING,
        inputType: EDIT_TYPE.INPUT_STRING,
        required: true
    },
    date: {
        key: 'date',
        title: '考试时间',
        type: FIELD_TYPE.TIMESTAMP,
        inputType: EDIT_TYPE.DATE,
        render: (input: any) => moment(input, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
        required: true
    },
    totalScore: {
        key: 'total_score',
        title: '考试总分',
        type: FIELD_TYPE.FLOAT,
        showOnAdd: false,
        showOnEdit: false
    },
    totalPeople: {
        key: 'total_people',
        title: '考试总人数',
        type: FIELD_TYPE.INT,
        showOnAdd: false,
        showOnEdit: false
    },
    pv: {
        key: 'pv',
        title: '报告访问量',
        type: FIELD_TYPE.INT,
        showOnAdd: false,
        showOnEdit: false
    },
    ready: {
        key: 'ready',
        title: '是否就绪',
        type: FIELD_TYPE.BOOLEAN,
        render: (input: any) => input ? '是' : '否',
        showOnAdd: false,
        showOnEdit: false
    }
};
export default class ReportModel extends BaseModel implements PropertiesInterface {
    p = PROPERTIES
    constructor() {
        super(PROPERTIES);
    }
}

