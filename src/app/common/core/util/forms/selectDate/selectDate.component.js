'use strict';

import controller from './selectDate.controller';
import template from './selectDate.html';
import './selectDate.scss';

const selectDateComponent = {
    bindings: {
        ngModel: '=',
        ngRequired: '<',
        label: '@',
        ngDisabled: '<'
    },
    controller,
    template
};

export default selectDateComponent;
