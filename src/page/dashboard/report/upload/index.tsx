/**
 * @fileOverview Report edit page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import {ROUTE_PATH} from '../../../../routes';
import ReportModel from '../../../../a-model/report';
const model = new ReportModel();
import * as reportActions from '../../../../a-action/report';
import {browserHistory} from 'react-router';
import {Row, Col, Upload, Icon} from 'antd';
const Dragger = Upload.Dragger;
import BreadCrumbAUI from '../../../../components/admin-ui/breadcrumb';

const style = _importLess('./index', __dirname);
class ReportEdit extends BaseComponent<{
    data: any
}, {
    fileList?: any[],
    msg?: string,
    uploadSuccess?: boolean,
    client?: boolean,
    uploadProgressFinished?: boolean
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
            fileList: [],
            msg: '点击或拖拽要上传的文件到此处',
            uploadSuccess: undefined,
            uploadProgressFinished: false,
            client: false
        };
    }
    componentDidMount() {
        this.setState({
            client: true
        });
    }
    handleFileUpload(info: any) {
        console.log(info);
        if(this.state.uploadProgressFinished) {
            if(info.file && info.file.response && info.file.response.result_code !== 0) {
                this.setState({
                    msg: info.file.response.err_msg,
                    uploadSuccess: false,
                    uploadProgressFinished: false
                });
            } else {
                this.setState({
                    msg: '数据已成功更新！',
                    uploadSuccess: true,
                    uploadProgressFinished: false
                }, () => {
                    this.props.dispatch(reportActions.get(this.props.params.id));
                });
            }
        }
        
        if(info.event && info.event.percent === 100) {
            this.setState({
                uploadProgressFinished: true
            });
        }

        let fileList = info.fileList.slice(-1);
        this.setState({
            fileList
        });
    }
    render() {
        const {data} = this.props;

        const BREADCRUMB_CONTENT = [
            {
                href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.REPORT}`,
                title: '报告管理'
            },
            {
                title: `更新${data[model.p.title.key]}的考试成绩数据`
            }
        ];
        let dragger;
        if(this.state.client) {
            dragger = <Dragger
                name="data"
                action={`http://${__API_SERVER_AJAX_HOSTNAME__}:${__API_SERVER_AJAX_PORT__}/admin/exam/importData`}
                accept=".xls"
                enctype="multipart/form-data"
                supportServerRender={true}
                data={{eid: this.props.params.id}}
                onChange={this.handleFileUpload.bind(this)}
                headers={{'X-Requested-With': null}}
                fileList={this.state.fileList}
            >
                <p className="ant-upload-drag-icon" data-success={this.state.uploadSuccess === true} data-error={this.state.uploadSuccess === false}>
                    {
                        this.state.uploadSuccess === undefined ?
                        <Icon type="inbox" /> :
                        this.state.uploadSuccess === true ?
                        <Icon type="smile" /> :
                        <Icon type="frown" />
                    }
                </p>
                <p className="ant-upload-text">{this.state.msg}</p>
                <p className="ant-upload-hint">请上传符合模板规则的.xls文件, 数据上传与更新通常需要30s到几分钟不等，请耐心等待</p>
            </Dragger>;
        }

        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-report-edit">
                     <Row className="top-section">
                        <Col span={10} offset={1}>
                            <BreadCrumbAUI content={BREADCRUMB_CONTENT}></BreadCrumbAUI>
                            <span className="back-link-section">
                                <a onClick={e => browserHistory.goBack()}>返回上一页</a>
                            </span>
                        </Col>
                     </Row>
                     <Row>
                        <Col span={23} offset={1}>
                            {dragger}
                        </Col>
                     </Row>
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