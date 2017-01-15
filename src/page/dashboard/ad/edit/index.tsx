/**
 * @fileOverview Ad edit page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import createSelector from '../../../../utils/immu-reselect';
import BaseComponent, {Interceptor} from '../../../../base';
import EditPage from '../../../../components/admin-ui/edit-page';
import {ROUTE_PATH} from '../../../../routes';
import AdModel from '../../../../a-model/ad';
const model = new AdModel();
import * as adActions from '../../../../a-action/ad';
import {browserHistory} from 'react-router';
import {message} from 'antd';

const style = _importLess('./index', __dirname);
class AdEdit extends BaseComponent<{
    img: string,
    url: string
}, {
    loading: boolean
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    getInitDataAction(force?: boolean, props?: any): {} {
        if(force || !this.props.img) {
            return adActions.get();
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
        const {dispatch} = this.props;

        this.setState({
            loading: true
        });

        let result = dispatch(adActions.update(null, values));
        result.then(() => {
            this.setState({
                loading: false
            });
            message.success('更新成功');
        }, (err: Error) => {
            this.setState({
                loading: false
            });
            message.error('更新失败');
        });
    }
    render() {
        const {img, url} = this.props;

        const BREADCRUMB_CONTENT = [
            {
                href: `/${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.AD}`,
                title: '广告管理'
            },
            {
                title: `配置`
            }
        ];
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-ad-edit">
                     <EditPage 
                        breadcrumbContent={BREADCRUMB_CONTENT}
                        fileds={model.getEditProperties()}
                        onSubmit={this.handleEdit.bind(this)}
                        loading={this.state.loading}
                        data={{
                            [model.p.img.key]: img,
                            [model.p.url.key]: url
                        }}
                        hideBackLink={true}
                     />
                </div>
            </div>
        );
    }
}

const selector = createSelector(
    (state: any, props: any) => state.ad.get(model.p.img.key),
    (state: any, props: any) => state.ad.get(model.p.url.key),
    (img: any, url: any) => ({
        img, url
    })
);

export = connect(selector)(AdEdit);