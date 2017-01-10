/**
 * @fileOverview Custom breadcrumb based on antd
 * @author Max
 */
 
 import * as React from 'react';
 import {Breadcrumb} from 'antd';

 export interface BreadcrumbContent {
     href?: string,
     title: string
 }

 export default class BreadcrumbAUI extends React.Component<{
     content: BreadcrumbContent[]
 }, any> {
     render() {
        let breadcrumbItems: any = [];
        this.props.content.forEach(item => {
            let newItem;
            if(item.href) {
                newItem = <Breadcrumb.Item key={item.title} href={item.href}>{item.title}</Breadcrumb.Item>;
            } else {
                newItem = <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>;
            }
            breadcrumbItems.push(newItem);
        });

        return (
            <Breadcrumb separator='/'>
                {breadcrumbItems}
            </Breadcrumb>
        );
    }
 }