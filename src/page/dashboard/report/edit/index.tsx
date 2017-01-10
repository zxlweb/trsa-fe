/**
 * @fileOverview Report edit page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import EditPage from '../../../../components/admin-ui/edit-page';
import {ROUTE_PATH} from '../../../../routes';
import ReportModel from '../../../../a-model/report';
const model = new ReportModel();
import * as reportActions from '../../../../a-action/report';
import {browserHistory} from 'react-router';

const REPORT_INDEX_PATH = `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`;

const style = _importLess('./index', __dirname);
class ReportEdit extends BaseComponent<any, {
    loading: boolean
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    getInitDataAction(force?: boolean, props?: any): {} {
        if(force || !this.props.data) {
            return reportActions.get(props.params.id);
        }
        return null;
    }
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }
    handleEdit(values: any) {
        const {dispatch, data} = this.props;

        this.setState({
            loading: true
        });

        let result = dispatch(reportActions.update(data[model.p.id.key], values));
        result.then(() => {
            this.setState({
                loading: false
            });
            browserHistory.push(REPORT_INDEX_PATH);
        }, (err: Error) => {
            
        });
    }
    render() {
        const {data} = this.props;

        const BREADCRUMB_CONTENT = [
            {
                href: REPORT_INDEX_PATH,
                title: '报告管理'
            },
            {
                title: `编辑${data[model.p.title.key]}`
            }
        ];
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-report-add">
                     <EditPage 
                        breadcrumbContent={BREADCRUMB_CONTENT}
                        fileds={model.getEditProperties()}
                        onSubmit={this.handleEdit.bind(this)}
                        loading={this.state.loading}
                        data={data}
                     />
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any, props: any) => state.report.getIn(['data', props.params.id]),
    (state: any, props: any) => state.report.get('tempData'),
    (reportData: any, tempData: any) => ({
        data: tempData ? tempData.toJS() : reportData.toJS()
    })
);

export = connect(selector)(ReportEdit);