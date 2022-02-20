'use strict';

import controller from './fileUpload.controller';
import template from './fileUpload.html';
import './fileUpload.scss';

const FileUploadComponent = {
    bindings: {
        onCompleteItem: '=',
        onCompleteAll: '=',
        onAfterAddingFile: '=',
        onBeforeUploadItem: '=',
        label: '@',
        textUpload: '@',
        multiple: '@',
        maxfiles: '@',
        types: '@',
        mimeTypes: '@',
        name: '@',
        url: '=',
        form: '<',
        data: '=',
        maxsize: '@',
        fileBase64: '=',
        fileSelect: '='
    },
    controller,
    template
};

export default FileUploadComponent;
