'use strict';

import controller from './documentoIdentidad.controller';
import template from './documentoIdentidad.html';
import './documentoIdentidad.scss';

const documentoIdentidadComponent = {
    bindings: {
        ngModel: '=',
        onlyCi: '@',
        conf: '<',
        url: '<',
        callcackSearch:'<'
    },
    controller,
    template
};

export default documentoIdentidadComponent;
