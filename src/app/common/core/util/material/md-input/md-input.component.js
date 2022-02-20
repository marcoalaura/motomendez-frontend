'use strict';

import controller from './md-input.controller';
import './md-input.scss';

const MdInputComponent = {
    bindings: {
        label: '@',
        type: '@',
        required: '@',
        ngRequired: '@',
        disabled: '@',
        ngDisabled: '@',
        readonly: '@',
        ngReadonly: '@',
        ngModel: '=',
        ngClick: '<',
        ngChange: '<',
        ngModelOptions: '<',
        value: '<',
        ngValue: '<',
        ngDefault: '<'
    },
    template: `
    <div class="md-form-group" md-event-label>
        <input ng-required="$ctrl.required || $ctrl.ngRequired" 
               ng-disabled="$ctrl.disabled || $ctrl.ngDisabled" 
               ng-readonly="$ctrl.readonly || $ctrl.ngReadonly" 
               ng-model="$ctrl.ngModel" 
               ng-click="$ctrl.ngClick" 
               ng-change="$ctrl.ngChange" 
               ng-model-options="$ctrl.ngModelOptions"
               ng-placeholder="$ctrl.placeholder"
               type="{{ $ctrl.type || 'text' }}"
               $ctrl.ngValue || $ctrl.ngDefault || $ctrl.value || ''>
        <label class="md-control-label" for="input">{{ $ctrl.label }}</label>
        <i class="md-bar"></i>
    </div>
    `,
    controller
};

export default MdInputComponent;