/**
 * @fileOverview list page utils collection
 * @author Max
 */

import {FieldDefinition} from '../../../a-model/base';
export interface ColumnHead {
    title: string,
    dataIndex: string,
    render?: Function
}
export function generateColumn(array: FieldDefinition[]) {
    return array.map(item => ({
        title: item.title,
        dataIndex: item.key
    }));
}
export function generateListData(array: FieldDefinition[], dataIndex: number[], data: any) {
    let result: {
        key: number,
        [key: string]: any
    }[] = [];

    dataIndex.map((index) => {
        let singleItem = data.get(index + '');
        
        let obj: any = {
            key: index
        };
        array.forEach(i => {
            let raw = singleItem.get(i.key);
            obj[i.key] = i.render ? i.render(raw) : raw;
        });
        result.push(obj);
    });

    return result;
}