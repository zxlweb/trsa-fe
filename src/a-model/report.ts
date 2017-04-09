/**
 * @fileOverview Report Model
 * @author Max
 */

import {EDIT_TYPE, FIELD_TYPE} from './enum';
import {default as BaseModel, PropertiesInterface, FieldDefinition} from './base';
import * as moment from 'moment';
import {GRADE} from '../const/grade';

const PROPERTIES: {
    id: FieldDefinition,
    title: FieldDefinition,
    date: FieldDefinition,
    totalScore: FieldDefinition,
    totalPeople: FieldDefinition,
    viewed: FieldDefinition,
    pv: FieldDefinition,
    ready: FieldDefinition,
    noTeacher: FieldDefinition,
    noQuestionDetail: FieldDefinition,
    noKP: FieldDefinition,
    grade: FieldDefinition
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
    grade: {
        key: 'grade',
        title: '年级',
        type: FIELD_TYPE.INT,
        inputType: EDIT_TYPE.SELECT_SINGLE,
        render: (input: number) => GRADE[input - 1],
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
    viewed: {
        key: 'viewed_count',
        title: '已查询报告人数',
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
        inputType: EDIT_TYPE.CHECKBOX,
        render: (input: any) => input ? '是' : '否',
        showOnAdd: false
    },
    noTeacher: {
        key: 'no_teacher',
        title: '隐藏同门排名',
        type: FIELD_TYPE.BOOLEAN,
        inputType: EDIT_TYPE.CHECKBOX,
        render: (input: any) => input ? '是' : '否',
    },
    noQuestionDetail: {
        key: 'no_question_detail',
        title: '隐藏小分',
        type: FIELD_TYPE.BOOLEAN,
        inputType: EDIT_TYPE.CHECKBOX,
        render: (input: any) => input ? '是' : '否',
    },
    noKP: {
        key: 'no_kp',
        title: '隐藏知识点',
        type: FIELD_TYPE.BOOLEAN,
        inputType: EDIT_TYPE.CHECKBOX,
        render: (input: any) => input ? '是' : '否',
    }
};
export default class ReportModel extends BaseModel implements PropertiesInterface {
    p = PROPERTIES
    constructor() {
        super(PROPERTIES, 'exam');
    }
}

