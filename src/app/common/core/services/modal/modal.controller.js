'use strict';

class ModalController {

    constructor($uibModalInstance, data, title, icon, message, labelOk, labelCancel, cancel, eventCancel, eventOk, btnClose) {
        'ngInject';
        
        this.data = data;
        this.title = title;
        this.icon = icon;
        this.message = message;
        this.labelOk = labelOk;
        this.eventCancel = eventCancel;
        this.eventOk = eventOk;
        this.labelCancel = labelCancel;
        this.cancel = typeof cancel == 'undefined' ? true : cancel === '' ? true : cancel;
        this.$uibModalInstance = $uibModalInstance;
        this.btnClose = typeof btnClose == 'undefined' ? true : btnClose;
    }

    ok() {
        this.$uibModalInstance.close(this.data);
        
        if (typeof this.eventOk == 'function') {
            this.eventOk();
        }
    }

    close() {
        this.$uibModalInstance.dismiss('cancel');

        if (typeof this.eventCancel == 'function') {
            this.eventCancel();
        }
    }

}

export default ModalController;