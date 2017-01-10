/**
 * @fileOverview Base model class
 * @author Max
 */

import {EDIT_TYPE, FIELD_TYPE} from './enum';
export interface FieldDefinition {
    key: string,
    type?: FIELD_TYPE, // default FIELD_TYPE.STRING
    title?: string, // default ''
    mainKey?: boolean, // default false
    newableMainKey?: boolean, // default fasle
    showOnList?: boolean // default true
    render?(input: any): string | React.ReactNode
    showOnAdd?: boolean // default true
    showOnEdit?: boolean // default true
    inputType?: EDIT_TYPE // default EDIT_TYPE.INPUT_STRING
    imgUploadDirectory?: string,
    required?: boolean // default false
    validators?: {
        func: (value: any) => boolean,
        msg: string
    }[]
}

export interface PropertiesInterface {
    p: {
        [key: string]: FieldDefinition
    }
}
export default class BaseModel {
    private properties: {
        [key: string]: FieldDefinition
    }
    constructor(p: {[key: string]: FieldDefinition}) {
        this.properties = p;
        this.completeProperties();
    }
    getListProperties() {
        let result: FieldDefinition[] = [];
        for(let i in this.properties) {
            if(this.properties[i].showOnList) {
                result.push(this.properties[i]);
            }
        }
        return result;
    }
    getAddProperties() {
        let result: FieldDefinition[] = [];
        for(let i in this.properties) {
            if(this.properties[i].showOnAdd && !this.properties[i].mainKey) {
                result.push(this.properties[i]);
            }
        }
        return result;
    }
    getEditProperties() {
        let result: FieldDefinition[] = [];
        for(let i in this.properties) {
            if(this.properties[i].showOnEdit && !this.properties[i].mainKey && !this.properties[i].newableMainKey) {
                result.push(this.properties[i]);
            }
        }
        return result;
    }
    getViewProperties() {

    }
    private completeProperties() {
        for(let i in this.properties) {
            let obj = this.properties[i];
            obj.type = obj.type || FIELD_TYPE.STRING;
            obj.inputType = obj.inputType || EDIT_TYPE.INPUT_STRING;
            obj.title = obj.title || '';
            obj.mainKey = obj.mainKey || false;
            obj.newableMainKey = obj.newableMainKey || false;
            obj.required = obj.required || false;
            obj.showOnList = obj.showOnList !== undefined ? obj.showOnList : true;
            obj.showOnAdd = obj.showOnAdd !== undefined ? obj.showOnAdd : true;
            obj.showOnEdit = obj.showOnEdit !== undefined ? obj.showOnEdit : true;
        }
    }
}