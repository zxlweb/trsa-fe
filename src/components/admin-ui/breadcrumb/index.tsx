/**
 * @fileOverview Custom breadcrumb based on antd
 * @author Max
 */

import * as React from 'react';
import { Breadcrumb } from 'antd';

export interface BreadcrumbContent {
    href?: string,
    title: string
}

export default class BreadcrumbAUI extends React.Component<{
    content: BreadcrumbContent[]
}, any> {
    render() {
        let breadcrumbItems = this.props.content.map((item) => {
            if (item.href) {
                return <Breadcrumb.Item key={item.title} href={item.href}>{item.title}</Breadcrumb.Item>;
            } else {
                return <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>;
            }
        });
        return (
            <Breadcrumb separator='/'>
                {breadcrumbItems}
            </Breadcrumb>
        );
    }
}
