/**
 * @fileOverview Edit page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../../base';
import {Row, Col, Button, Input, Table, Popconfirm, Form, DatePicker, Checkbox, Select} from 'antd';
import {WrappedFormUtils} from 'antd/lib/form/Form';
const FormItem = Form.Item;
const Option = Select.Option;
import {default as BreadCrumbAUI, BreadcrumbContent} from '../breadcrumb';
import {browserHistory} from 'react-router';
import {FieldDefinition} from '../../../a-model/base';
import {EDIT_TYPE, FIELD_TYPE} from '../../../a-model/enum';
import * as moment from 'moment';
import findIndex = require('lodash.findindex');
import clone = require('lodash.clonedeep');
import ImageUpload from '../image-upload';
import {URLValidator} from '../../../utils/validator';
import {GRADE} from '../../../const/grade';

class CustomizedForm extends React.Component<{
    fileds: FieldDefinition[],
    form?: WrappedFormUtils,
    onSubmit: (values: any) => void,
    loading: boolean,
    data: any
}, any> {
    transformOut(value: any, type: EDIT_TYPE) {
        switch(type) {
            case EDIT_TYPE.DATE: return value.format('YYYY-MM-DD HH:mm:ss');
            case EDIT_TYPE.IMAGE: return value[0].url;
        }
        return value;
    }
    transformIn(value: any, type: EDIT_TYPE) {
        switch(type) {
            case EDIT_TYPE.DATE: return moment(value, 'YYYY-MM-DD HH:mm:ss');
            case EDIT_TYPE.IMAGE: return [{url: value}];
        }

        return value;
    }
    handleSubmit() {
        const {form, fileds, onSubmit} = this.props;
        form.validateFieldsAndScroll(fileds.map(item => item.key), {}, (err: any, values: any) => {
            if(!err) {
                let result = clone(values);
                for(let i in values) {
                    let index = findIndex(fileds, (item) => item.key === i);
                    result[i] = this.transformOut(result[i], fileds[index].inputType);
                }
                
                onSubmit(result);
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        
        let formItems = this.props.fileds.map((item, index) => {
            let inputComponent: React.ReactNode;
            let typeValidators: any[] = [];

            switch(item.inputType) {
                case EDIT_TYPE.INPUT_STRING: inputComponent = <Input />;break;
                case EDIT_TYPE.DATE: 
                    inputComponent = <DatePicker></DatePicker>;
                    typeValidators.push((value: any) => moment.isMoment(value));
                    break;
                case EDIT_TYPE.IMAGE:
                    inputComponent = <ImageUpload listType="picture" directory={item.imgUploadDirectory} limit={1}></ImageUpload>;
                    typeValidators.push((fileList: any[]) => fileList && fileList.length > 0);
                    break;
                case EDIT_TYPE.URL: 
                    inputComponent = <Input type="text"></Input>;
                    typeValidators.push(URLValidator);
                    break;
                case EDIT_TYPE.CHECKBOX:
                    inputComponent = <Checkbox></Checkbox>;
                    break;
                case EDIT_TYPE.SELECT_SINGLE:
                    inputComponent = <Select>
                        {
                            GRADE.map((item, index) => {
                                return (
                                    <Option key={index} value={(index + 1)}>{item}</Option>
                                );
                            })
                        }
                    </Select>;
                    break;
                default: inputComponent = <Input></Input>;
            }

            return (
                <FormItem label={item.title} key={index} labelCol={{span: 4}} wrapperCol={{span: 10}}>
                    {
                        getFieldDecorator(item.key, {
                            rules: [
                                {
                                    type: (() => {
                                        switch(item.type) {
                                            case FIELD_TYPE.STRING: return 'string';
                                            case FIELD_TYPE.TIMESTAMP: return 'object';
                                            case FIELD_TYPE.INT: return 'integer';
                                            case FIELD_TYPE.FLOAT: return 'float';
                                            case FIELD_TYPE.BOOLEAN: return 'boolean';
                                            case FIELD_TYPE.IMAGE: return 'array';
                                        }
                                        return 'string';
                                    })(),
                                    required: item.required,
                                    message: `${item.title}不能为空`
                                },
                                {
                                    validator(rule: any,value: any,callback: any) {
                                        let errors: Error[] = [];
                                        item.validators && item.validators.forEach(v => {
                                            if(!v.func(value)) {
                                                errors.push(new Error(v.msg));
                                            }
                                        });
                                        typeValidators.forEach(v => {
                                            if(!v(value)) {
                                                errors.push(new Error(`请输入正确的${item.title}`))
                                            }
                                        })
                                        callback(errors);
                                    }
                                }
                            ],
                            valuePropName: (() => {
                                switch(item.inputType) {
                                    case EDIT_TYPE.IMAGE: return 'fileList';
                                    case EDIT_TYPE.CHECKBOX: return 'defaultChecked';
                                }
                                return 'value';
                            })(),
                            initialValue: this.transformIn(this.props.data[item.key], item.inputType)
                        })(inputComponent)
                    }
                </FormItem>
            )
        });
        return (
            <Form>
                {formItems}
                <FormItem wrapperCol={{offset: 4, span: 10}}>
                    <Button loading={this.props.loading} type="primary" htmlType="button" onClick={this.handleSubmit.bind(this)}>提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const AddPageForm = Form.create({

})(CustomizedForm);

const style = _importLess('./index', __dirname);
export default class EditPage extends BaseComponent<{
    breadcrumbContent: BreadcrumbContent[],
    fileds: FieldDefinition[],
    onSubmit: (values: any) => void,
    loading: boolean,
    data: any,
    hideBackLink?: boolean
}, any> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);
    }
    handleAdd(values: any) {
        this.props.onSubmit(values);
    }
    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-edit">
                     <Row className="top-section">
                        <Col span={10} offset={1}>
                            <BreadCrumbAUI content={this.props.breadcrumbContent}></BreadCrumbAUI>
                            {
                                !this.props.hideBackLink ?
                                <span className="back-link-section">
                                    <a onClick={e => browserHistory.goBack()}>返回上一页</a>
                                </span> : ''
                            }
                        </Col>
                     </Row>
                     <Row>
                        <Col span={22} offset={1}>
                            <AddPageForm loading={this.props.loading} fileds={this.props.fileds} onSubmit={this.handleAdd.bind(this)} data={this.props.data}></AddPageForm>
                        </Col>
                     </Row>
                </div>
            </div>
        );
    }
}
