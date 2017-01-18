/**
 * @fileOverview Report List Page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import {ROUTE_PATH} from '../../../../routes';
import ReportModel from '../../../../a-model/report';
const model = new ReportModel();
import {generateColumn, generateListData} from '../../../../components/admin-ui/utils/list';
import ListPage from '../../../../components/admin-ui/list-page';
import * as querystring from 'query-string';
import {PropTypes as RouterPropTypes} from 'react-router';
import * as reportActions from '../../../../a-action/report';
import REQUEST from '../../../../const/request';

const BREADCRUMB_CONTENT = [
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`,
        title: '报告管理'
    },
    {
        title: '考情报告列表'
    }
];
const TABLE_HEAD = generateColumn(model.getListProperties()).concat();

const style = _importLess('./index', __dirname);
class ReportList extends BaseComponent<{
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
            return reportActions.getAll();
        }
        return null;
    }
    render() {
        const {data, dataIndex, dispatch} = this.props;

        const query = querystring.parse(this.props.location.search);
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-report-list">
                    <ListPage 
                        breadcrumbContent={BREADCRUMB_CONTENT}
                        column={TABLE_HEAD}
                        data={data}
                        dataIndex={dataIndex}
                        path={`/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}/${ROUTE_PATH.REPORT_LIST}`}
                        editFunc={{
                            idKey: model.p.id.key,
                            redirectURL: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}/${ROUTE_PATH.REPORT_EDIT}`
                        }}
                        deleteFunc={{
                            idKey: model.p.id.key,
                            delAction: (id: number) => {
                                dispatch(reportActions.del(id));
                            },
                            msg: '删除后该报告的成绩分析数据将一并删除且不可恢复。'
                        }}
                        currentPage={parseInt(query['page'] as string, 10)}
                        filterInput={query['filterInput'] as string}
                        addFunc={{
                            text: '新增考情报告',
                            redirectURL: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}/${ROUTE_PATH.REPORT_ADD}`
                        }}
                        filterFunc={{
                            filterKey: [model.p.title.key, model.p.date.key],
                            placeholder: '输入报告名称或考试时间进行筛选'
                        }}
                        extraFunc={[
                            {
                                actionTitle: '上传数据',
                                redirectURL: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}/${ROUTE_PATH.REPORT_UPLOAD}`,
                                idKey: model.p.id.key
                            },
                            {
                                actionTitle: '查询情况统计表',
                                redirectURL: `http://${__API_SERVER_AJAX_HOSTNAME__}:${__API_SERVER_AJAX_PORT__}${REQUEST.GET_EXAM_VIEWED_DATA}`,
                                noRedirect: true,
                                idKey: model.p.id.key,
                                paramGenerator: (id: number) => `?eid=${id}`
                            }
                        ]}
                    />
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any) => state.report.get('dataIndex'),
    (state: any) => state.report.get('data'),
    (state: any) => state.report.get('inited'),
    (dataIndex: any, data: any, inited: boolean) => {

        dataIndex = dataIndex.sort((a: any, b: any) => {
            return data.getIn([b + '', model.p.id.key]) - data.getIn([a + '', model.p.id.key]);
        });
        
        return {
            dataIndex: dataIndex.toJS(),
            data: generateListData(model.getListProperties(), dataIndex, data),
            inited
        };
    }
);

export = connect(selector)(ReportList);