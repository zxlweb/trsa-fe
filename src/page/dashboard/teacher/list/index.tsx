/**
 * @fileOverview Teacher List Page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import {ROUTE_PATH} from '../../../../routes';
import TeacherModel from '../../../../a-model/teacher';
const model = new TeacherModel();
import {generateColumn, generateListData} from '../../../../components/admin-ui/utils/list';
import ListPage from '../../../../components/admin-ui/list-page';
import * as querystring from 'query-string';
import {PropTypes as RouterPropTypes} from 'react-router';
import * as teacherActions from '../../../../a-action/teacher';

const BREADCRUMB_CONTENT = [
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}`,
        title: '教师管理'
    },
    {
        title: '报告列表'
    }
];
const TABLE_HEAD = generateColumn(model.getListProperties()).concat();

const style = _importLess('./index', __dirname);
class TeacherList extends BaseComponent<{
    data: {
        [key: string]: any
    }[],
    dataIndex: number[],
    inited: boolean
}, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    getInitDataAction(force?: boolean): {} {
        if(force || !this.props.inited) {
            return teacherActions.getAll();
        }
        return null;
    }
    render() {
        const {data, dataIndex, dispatch} = this.props;

        const query = querystring.parse(this.props.location.search);
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-teacher-list">
                    <ListPage 
                        breadcrumbContent={BREADCRUMB_CONTENT}
                        column={TABLE_HEAD}
                        data={data}
                        dataIndex={dataIndex}
                        path={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}/${ROUTE_PATH.TEACHER_LIST}`}
                        editFunc={{
                            idKey: model.p.name.key,
                            redirectURL: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}/${ROUTE_PATH.TEACHER_EDIT}`
                        }}
                        currentPage={parseInt(query['page'] as string, 10)}
                        filterInput={query['filterInput'] as string}
                        addFunc={{
                            text: '新增教师',
                            redirectURL: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}/${ROUTE_PATH.TEACHER_ADD}`
                        }}
                        filterFunc={{
                            filterKey: [model.p.name.key],
                            placeholder: '输入教师名称进行筛选'
                        }}
                    />
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any) => state.teacher.get('dataIndex'),
    (state: any) => state.teacher.get('data'),
    (state: any) => state.teacher.get('inited'),
    (dataIndex: any, data: any, inited: boolean) => {

        // result.sort((a, b) => {
        //     let aMoment = moment(a[MODEL.properties.time.key], 'YYYY-MM-DD HH:mm:ss');
        //     let bMoment = moment(b[MODEL.properties.time.key], 'YYYY-MM-DD HH:mm:ss');

        //     return aMoment.isBefore(bMoment) ? 1 : aMoment.isSame(bMoment) ? 0 : -1;
        // });

        return {
            dataIndex: dataIndex.toJS(),
            data: generateListData(model.getListProperties(), dataIndex, data),
            inited
        };
    }
);

export = connect(selector)(TeacherList);