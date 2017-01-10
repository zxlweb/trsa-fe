/**
 * @fileOverview Report add page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../../../base';
import AddPage from '../../../../components/admin-ui/add-page';
import {ROUTE_PATH} from '../../../../routes';
import ReportModel from '../../../../a-model/report';
const model = new ReportModel();
import * as reportActions from '../../../../a-action/report';
import {browserHistory} from 'react-router';

const BREADCRUMB_CONTENT = [
    {
        href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`,
        title: '报告管理'
    },
    {
        title: '新增考情报告'
    }
];

const style = _importLess('./index', __dirname);
class ReportAdd extends BaseComponent<any, {
    loading: boolean
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }
    handleAdd(values: any) {
        const {dispatch} = this.props;

        this.setState({
            loading: true
        });

        let result = dispatch(reportActions.save(values));
        result.then(() => {
            this.setState({
                loading: false
            });
            browserHistory.push((BREADCRUMB_CONTENT[0] as any).href);
        }, (err: Error) => {
            
        });
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-report-add">
                     <AddPage 
                        breadcrumbContent={BREADCRUMB_CONTENT}
                        fileds={model.getAddProperties()}
                        onSubmit={this.handleAdd.bind(this)}
                        loading={this.state.loading}
                     />
                </div>
            </div>
        );
    }
}

const selector = () => ({});

export = connect(selector)(ReportAdd);