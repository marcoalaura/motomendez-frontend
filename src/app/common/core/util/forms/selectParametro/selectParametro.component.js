'use strict';

import controller from './selectParametro.controller';
import template from './selectParametro.html';
import './selectParametro.scss';

const selectParametroComponent = {
    bindings: {
        ngModel: '=',
        ngRequired: '<',
        ngDisabled: '<',
        ngChange: '&',
        parametro: '@',
        query: '@',
        typeSelect: '@',
        keyText: '@',
        label: '@',
        opcional: '@'
    },
    controller,
    template
};

export default selectParametroComponent;
