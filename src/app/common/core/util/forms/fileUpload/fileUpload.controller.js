'use strict';

class MdFileUploadController {
    constructor($scope, FileUploader, Message, Util, Loading, Storage, Auth, baseUrl, $log) {
        'ngInject';

        this.FileUploader = FileUploader;
        this.Message = Message;
        this.Util = Util;
        this.baseUrl = baseUrl;
        this.Loading = Loading;
        this.Storage = Storage;
        this.Auth = Auth;
        this.$log = $log;
        this.$scope = $scope;

        this.charset = {
            'xlsx': ['vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats'],
            'xls': 'vnd.ms-excel',
            'ods': 'x-vnd.oasis.opendocument.spreadsheet',
            'rar': 'x-rar',
            'pdf': 'pdf',
            'csv': ['csv', 'vnd.ms-excel'],
            'plain': 'plain',
            'jpg': 'jpg',
            'png': 'png',
            'jpeg': 'jpeg',
            'bmp': 'bmp',
            'gif': 'gif'
        };
    }

    $onInit() {

        this.idFile = `file-${this.Util.id()}`;
        let log = this.$log;

        let uploader = this.$scope.uploader = new this.FileUploader({
            url: this.url,
            alias: this.name || 'file',
            formData: this.form || []
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(/*item, {File|FileLikeObject}, options*/) {
                return this.queue.length < 10;
            }
        });

        if (this.types) {
            uploader.filters.push({
                name: 'typesFilter',
                fn: (item) => {
                    let valid = this.isType(item, this.types);
                    if (!valid) {
                        this.Message.warning('Los formatos permitidos son: <strong>' + this.types.replace(/^\|+|\|+$/gm,'').replace(/\|/, ', ') + '</strong>.', 'Formato de archivo inválido');
                    }
                    return valid;
                }
            });
        }

        this.$log.log('Token', this.Storage.get('token') );
        uploader.headers.Authorization = 'Bearer '+ this.Storage.get('token');

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            log.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = fileItem => {
            if (typeof this.multiple == 'undefined' && uploader.queue.length > 1) {
                uploader.queue = uploader.queue.splice(1);
            }
            if (this.onAfterAddingFile) {
                this.onAfterAddingFile(fileItem);
            }
            log.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            log.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = item => {
            if (this.onBeforeUploadItem) {
                this.onBeforeUploadItem(item);
            }
            for (let i in this.form) {
                if (isNaN(i)) {
                    let data = {};
                    data[i] = this.form[i];
                    item.formData.push(data);
                }
            }
            log.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            log.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            log.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            log.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            log.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            log.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = (fileItem, response, status, headers) => {
            if (this.onCompleteItem) {
                this.onCompleteItem(fileItem, response, status, headers, this.reset);
            }
            log.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = () => {
            if (this.onCompleteAll) {
                this.onCompleteAll(this.reset);
            }
            log.info('onCompleteAll');
        };
    }

    isType(item, types) {
        let type = item.type.slice(item.type.lastIndexOf('/') + 1);
        let extension = null;
        if (item.name) {
            extension = item.name.split('.');
            extension = extension[extension.length - 1];

            // Hack para firefox que carga un csv con charset text/plain
            if ((type == 'plain' || type == 'download') && extension == 'csv') {
                return true;
            }
        }

        for (let i in this.charset) {
            if (this.Util.toType(this.charset[i]) == 'array') {
                let subtypes = this.charset[i];
                for (let j in subtypes) {
                    if (types.indexOf(i) != -1 && type == subtypes[j]) {
                        return true;
                    }
                }
            } else {
                if (types.indexOf(i) != -1 && type == this.charset[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    isImage(item) {
        let type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
}

export default MdFileUploadController;
