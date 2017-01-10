/**
 * @fileOverview 图片上传
 * @author Max
 **/

import * as React from 'react';
import {Upload, Icon, message} from 'antd';

interface FileInterface {
    uid?: string,
    status?: string,
    thumbUrl?: string,
    url: string,
    name?: string
}
const style = _importLess('./index', __dirname);
export default class ImageUpload extends React.Component<{
    onChange?: (fileList: FileInterface[]) => void,
    fileList?: FileInterface[],
    directory?: string,
    limit?: number
}, any> {
    constructor(props: any) {
        super(props);
    }
    handleChange(info: any) {
        let fileList = info.fileList;

        if(this.props.limit) {
            fileList = fileList.slice(-this.props.limit);
        }

        fileList = fileList.map((file: any, index: number) => {
            if (file.response) {
                file.url = file.response.file_path[0];
                file.name = `配图-${index+1}`;
            }
            return file;
        }).filter(function(file: any) {
            if (file.response) {
                return file.response.success === true;
            }
            return true;
        });

        // 删除图片
        // const deleteFiles = findDeleteFile(fileList, this.props.fileList);
        // let deleteTasks: any[] = [];
        // deleteFiles.forEach((item: any) => {
        //     deleteTasks.push(
        //         _http.get(`http://${__STUB_SERVER_AJAX_HOSTNAME__}:${__STUB_SERVER_AJAX_PORT__}${__IMAGE_UPLOAD_PATH__}${__IMAGE_UPLOAD_DELETE_PATH__}?key=${item.url}`)
        //     );
        // });
        // Promise.all(deleteTasks);
        
        this.props.onChange(fileList);
    }
    render() {

        return (
            <div>
                <style scoped dangerouslySetInnerHTML={{__html: style}}></style>
                <Upload.Dragger 
                    {...this.props} 
                    action={`${__IMAGE_UPLOAD_PATH__}${__IMAGE_UPLOAD_ADD_PATH__}${this.props.directory ? `?directory=${this.props.directory}` : ''}`} 
                    fileList={fileListPipe(this.props.fileList)} 
                    onChange={this.handleChange.bind(this)}
                    accept=".jpg,.jpeg,.png"
                >
                    <Icon type="plus"></Icon>
                </Upload.Dragger>
            </div>
        );
    }
}

function fileListPipe(fileList: any[] = []) {
    return fileList.map((item, index) => {
        item.uid = item.uid || generateUid(fileList);
        item.status = item.status || 'done';
        item.thumbUrl = item.thumbUrl || item.url;
        item.name = `image-${index+1}`;
        return item;
    });
}
function generateUid(fileList: any[] = []): any {
    let result = Math.floor(Math.random() * 10000 - 1);
    for(let i in fileList) {
        if(fileList[i].uid == result) {
            return generateUid(fileList);
        }
    }

    return result + '';
}
function findDeleteFile(newFileList: any[] = [], oldFileList: any[] = []) {
    let result: any = [];
    oldFileList.forEach(item => {
        let found = false;
        for(let i in newFileList) {
            if(item.uid === newFileList[i].uid) {
                found = true;
                break;
            }
        }
        if(!found) result.push(item);
    });

    return result;
}
