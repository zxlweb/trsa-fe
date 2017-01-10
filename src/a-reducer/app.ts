/**
 * @fileOverview 整个应用的reducer集合
 * @author Max
 **/

import {combineReducers} from 'redux';
import report from './report';
import teacher from './teacher';

const app = combineReducers({
    report,
    teacher
});

export default app;