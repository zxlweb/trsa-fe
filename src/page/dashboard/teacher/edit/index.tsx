/**
 * @fileOverview Teacher edit page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import EditPage from '../../../../components/admin-ui/edit-page';
import {ROUTE_PATH} from '../../../../routes';
import TeacherModel from '../../../../a-model/teacher';
const model = new TeacherModel();
import * as teacherActions from '../../../../a-action/teacher';
import {browserHistory} from 'react-router';

const TEACHER_INDEX_PATH = `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TEACHER}`;

const style = _importLess('./index', __dirname);
class TeacherEdit extends BaseComponent<any, {
    loading: boolean
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    getInitDataAction(force?: boolean, props?: any): {} {
        if(force || !this.props.data) {
            return teacherActions.get(props.params.id);
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

        let result = dispatch(teacherActions.update(data[model.p.name.key], values));
        result.then(() => {
            this.setState({
                loading: false
            });
            browserHistory.push(TEACHER_INDEX_PATH);
        }, (err: Error) => {
            
        });
    }
    render() {
        const {data} = this.props;

        const BREADCRUMB_CONTENT = [
            {
                href: TEACHER_INDEX_PATH,
                title: '教师管理'
            },
            {
                title: `编辑${data[model.p.name.key]}`
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
    (state: any, props: any) => state.teacher.getIn(['data', props.params.id]),
    (state: any, props: any) => state.teacher.get('tempData'),
    (teacherData: any, tempData: any) => ({
        data: tempData ? tempData.toJS() : teacherData.toJS()
    })
);

export = connect(selector)(TeacherEdit);