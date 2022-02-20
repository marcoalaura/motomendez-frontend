'use strict';

import controller from './crud-table.controller';
import template from './crud-table.html';

const CrudTableComponent = {
    bindings: {
        url: '<',
        title: '<',
        fields: '<',
        fieldsCreate: '<',
        fieldsUpdate: '<',
        fieldsSave: '<',
        fks: '<',
        buttons: '<',
        permission: '<',
        modalController: '<',
        modalTemplate: '<',
        addModalTemplate: '<',
        addModalController: '<',
        editModalTemplate: '<',
        editModalController: '<',
        inline: '@',
        editable: '@',
        pagination: '@',
        formly: '<',
        data: '=',
        callbackSave: '<',
        eventEdit: '<',
        hiddenFields: '<',
        mergeFields: '<',
        eventCreate: '<',
        labels: '<',
        delete: '<',
        update: '<'
    },
    controller,
    template
};

export default CrudTableComponent;