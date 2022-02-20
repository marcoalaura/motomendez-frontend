'use strict';

import Controller from './modal.controller';
import Template from './modal.html';
import PdfController from './pdf/pdfview.modal.controller';
import PdfTemplate from './pdf/pdfview.modal.html';

class ModalService {
    constructor($uibModal) {
        "ngInject";

        this.$uibModal = $uibModal;
    }

    show(config) {
        let setting = {
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: config.template || Template,
            controller: config.controller || Controller,
            controllerAs: '$ctrl',
            size: config.size,
            keyboard: typeof config.keyboard == 'undefined' ? true : config.keyboard,
            backdrop: 'static',
            resolve: {}
        };

        setData(config, setting, 'data');
        setData(config, setting, 'title');
        setData(config, setting, 'icon');
        setData(config, setting, 'message');
        setData(config, setting, 'labelOk');
        setData(config, setting, 'labelCancel');
        setData(config, setting, 'cancel');
        setData(config, setting, 'eventCancel');
        setData(config, setting, 'eventOk');
        setData(config, setting, 'btnClose');

        return this.$uibModal.open(setting);
    }    

    alert(message, callbackOk, title, icon, size) {
        this.show({
            title: title || 'Alerta',
            icon: icon || 'bell',
            message,
            size: size || 'sm',
            cancel: false,
            eventOk: callbackOk,
            keyboard: false,
            btnClose: false
        });
    }

    confirm(message, callbackOk, callbackCancel, title, labelOk, labelCancel, icon, size) {
        let config = {
            title: title || 'Confirmar',
            icon: icon || 'warning',
            message,
            eventOk: callbackOk,
            eventCancel: callbackCancel,
            labelOk,
            labelCancel,
            btnClose: false
        };
        if (typeof size == 'string') {
            config.size = size;
        }
        this.show(config);
    }
    
    pdf(urlPdfFile, title) {
        this.show({
            template: PdfTemplate,
            controller: PdfController,
            data: {
                urlPdf:urlPdfFile,
                title:title
            },
            size: 'lg'
        });
    }
}

function setData(config, setting, data) {
    setting.resolve[data] = () => {
        return typeof config[data] == 'undefined' ? '' : config[data];
    };
}

export default ModalService;