/**
 * @fileOverview 整个应用的reducer集合
 * @author Max
 **/

import {combineReducers} from 'redux';
import report from './report';
import teacher from './teacher';
import user from './user';
import ad from './ad';

const app = combineReducers({
    report,
    teacher,
    user,
    ad
});

export default app;