/**
 * @fileOverview List page
 * @author Max
 */

import * as React from 'react';
import {connect} from 'react-redux';
import BaseComponent, {Interceptor} from '../../../base';
import {Row, Col, Button, Input, Table, Popconfirm} from 'antd';
const Search = Input.Search;
import {default as BreadCrumbAUI, BreadcrumbContent} from '../breadcrumb';
import {ROUTE_PATH} from '../../../routes';
import {ColumnHead} from '..//utils/list';
import {browserHistory} from 'react-router';
import {notEmptyValidator} from '../../../utils/validator';

interface DataInterface {
    [key: string]: any
}

const style = _importLess('./index', __dirname);
export default class ListPage extends BaseComponent<{
    data: DataInterface[],
    dataIndex: any,
    column: ColumnHead[],
    viewFunc?: {
        idKey: string
        redirectURL: string
    },
    deleteFunc?: {
        idKey: string,
        delAction: (id: number) => void,
        msg?: string
    },
    editFunc?: {
        idKey: string
        redirectURL: string
    },
    breadcrumbContent: BreadcrumbContent[],
    currentPage?: number,
    filterInput?: string,
    path: string,
    tableArg?: {
        [key: string]: any
    },
    addFunc?: {
        text: string,
        redirectURL: string
    },
    filterFunc?: {
        filterKey: string[]
        placeholder: string
    },
    extraFunc? : [
        {
            actionTitle: string
            redirectURL: string
            noRedirect?: boolean
            idKey?: string
            paramGenerator?: (id: number) => string
        }
    ]
}, {
    filterInput?: string,
    compoundColumn?: any[]
}> {
    static interceptor: Interceptor = (wrap, config, props, res, req) => {

    }
    constructor(props: any) {
        super(props);

        this.state = {
            filterInput: '',
            compoundColumn: this.props.column.concat({
                title: '操作',
                dataIndex: '',
                render: (text: string, record: any) => {
                    let actions: {options: any, key: string}[] = [];
                    this.props.viewFunc && actions.push({options: this.props.viewFunc, key: 'view'});
                    if(this.props.extraFunc && this.props.extraFunc.length > 0) {
                        this.props.extraFunc.forEach(item => {
                            actions.push({
                                options: item,
                                key: 'extra'
                            })
                        });
                    }
                    this.props.editFunc && actions.push({options: this.props.editFunc, key: 'edit'});
                    this.props.deleteFunc && actions.push({options: this.props.deleteFunc, key: 'delete'});

                    let actionBlock: React.ReactNode[] = [];
                    actions.forEach((element, index) => {
                        if(index > 0) actionBlock.push(<span key={index + 'divider'} className="ant-divider"></span>);
                        switch(element.key) {
                            case 'delete': 
                                actionBlock.push(
                                    <Popconfirm key={index} 
                                        title={[
                                            <span key={11}>确定要删除这行数据吗？</span>,
                                            <br key={12}/>,
                                            <span key={13}>{element.options.msg}</span>
                                        ]} 
                                        onConfirm={() => this.handleDelete(record[this.props.deleteFunc.idKey])}
                                        placement="left"
                                    >
                                        <a>删除</a>
                                    </Popconfirm>
                                );
                                break;
                            case 'view':
                                actionBlock.push(
                                    <a key={index} onClick={e => browserHistory.push(`${element.options.redirectURL}/${record[element.options.idKey]}`)}>查看</a>
                                );
                                break;
                            case 'edit':
                                actionBlock.push(
                                    <a key={index} onClick={e => browserHistory.push(`${element.options.redirectURL}/${record[element.options.idKey]}`)}>编辑</a>
                                );
                                break;
                            case 'extra':
                                if(!element.options.noRedirect) {
                                    actionBlock.push(
                                        <a key={index} onClick={e => browserHistory.push(`${element.options.redirectURL}/${record[element.options.idKey]}`)}>{element.options.actionTitle}</a>
                                    );
                                } else {
                                    actionBlock.push(
                                        <a key={index} href={`${element.options.redirectURL}${element.options.paramGenerator(record[element.options.idKey])}`}>{element.options.actionTitle}</a>
                                    );
                                }
                                break;
                        }
                    });
                    return (
                        <span>
                            {actionBlock}
                        </span>
                    );
                }
            })
        }
    }
    handleDelete(id: number) {
        this.props.deleteFunc.delAction(id);
    }
    searchFilter(input: string, data: DataInterface[]): any[] {
        if(!this.props.filterFunc) return data;

        let result: any[] = [];
        if(!notEmptyValidator(input)) {
            result = data;
        } else {
            const inputs = input.split(' ');
            data.map(item => {
                let allInputsMatch = true;
                for(let i in inputs) {
                    let thisInputFindKey = false;
                    for(let j in this.props.filterFunc.filterKey) {
                        let key = this.props.filterFunc.filterKey[j];
                        let toCheckStr = item[key] || '';
                        if(toCheckStr.indexOf(inputs[i]) !== -1) {
                            thisInputFindKey = true;
                            break;
                        }
                    }
                    if(!thisInputFindKey) {
                        allInputsMatch = false;
                        break;
                    }
                }
                if(allInputsMatch) result.push(item);
            });
        }

        return result;
    }
    handleFilterSearch(value: string) {
        browserHistory.push(this.getCurrentStateURL({newFilterInput: value, newPage: 1}));
    }
    handleFilterChange(e: any) {
        if(e.target.value === '') {
            browserHistory.push(this.getCurrentStateURL({newFilterInput: '', newPage: 1}));
        }
    }
    getCurrentPage() {
        return this.props.currentPage || 1;
    }
    getCurrentStateURL(newParam: {
        newPage?: number,
        newFilterInput?: string
    }) {
        const {path, filterInput} = this.props;
        const newFilterInput = newParam.newFilterInput !== undefined ? newParam.newFilterInput : filterInput;
        return `${path}?page=${newParam.newPage || this.getCurrentPage()}${newFilterInput ? `&filterInput=${newFilterInput}` : ''}`;
    }
    render() {
        const {data, dataIndex} = this.props;

        const filteredData = this.searchFilter(this.props.filterInput, data);
        
        return (
            <div>
                <style dangerouslySetInnerHTML={{__html: style}}></style>
                <div id="page-list">
                    <Row className="top-section">
                        <Col span={6} offset={1}>
                            <BreadCrumbAUI content={this.props.breadcrumbContent}></BreadCrumbAUI>
                        </Col>
                        <Col span={17}>
                            {
                                this.props.addFunc ?
                                <Button type="primary" size="large" className="add-button" onClick={e => browserHistory.push(this.props.addFunc.redirectURL)}>{this.props.addFunc.text}</Button> : ''
                            }
                            {
                                this.props.filterFunc ?
                                <Search 
                                    placeholder={this.props.filterFunc.placeholder} 
                                    size="large" 
                                    className="filter" 
                                    defaultValue={this.props.filterInput} 
                                    onChange={this.handleFilterChange.bind(this)}
                                    onSearch={(value: string) => this.handleFilterSearch(value)}></Search> : ''
                            }
                        </Col>
                    </Row>
                     <Row>
                            <Col span={23} offset={1}>
                                <Table
                                    columns={this.state.compoundColumn}
                                    dataSource={filteredData}
                                    pagination={{
                                        current: this.getCurrentPage(),
                                        total: filteredData.length
                                    }}
                                    onChange={(pagination: any) => browserHistory.push(this.getCurrentStateURL({newPage: pagination.current}))}
                                    bordered 
                                    size="default"
                                    {...this.props.tableArg}
                                />
                            </Col>
                        </Row>
                </div>
            </div>
        );
    }
}