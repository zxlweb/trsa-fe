/**
 * @fileOverview 请求url
 * @author Max
 **/

const PREFIX = '/admin';

const REQUEST = {
    LIST_REPORT: `${PREFIX}/exam/list`,
    DELETE_REPORT: `${PREFIX}/exam/del`,
    SAVE_REPORT: `${PREFIX}/exam/add`,
    GET_REPORT: `${PREFIX}/exam/get`,
    UPDATE_REPORT: `${PREFIX}/exam/update`,
    LIST_TEACHER: `${PREFIX}/teacher/list`,
    DELETE_TEACHER: `${PREFIX}/teacher/del`,
    SAVE_TEACHER: `${PREFIX}/teacher/add`,
    GET_TEACHER: `${PREFIX}/teacher/get`,
    UPDATE_TEACHER: `${PREFIX}/teacher/update`,
    GET_AD_CONFIG: `${PREFIX}/config/get`,
    UPDATE_AD_CONFIG: `${PREFIX}/config/update`,
    GET_EXAM_VIEWED_DATA: `${PREFIX}/exam/getViewedData`
};

export default REQUEST;
