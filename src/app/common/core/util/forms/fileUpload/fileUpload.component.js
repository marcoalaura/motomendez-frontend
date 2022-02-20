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
        types: '@',
        name: '@',
        url: '=',
        form: '<',
        data: '='
    },
    controller,
    template
};

export default FileUploadComponent;