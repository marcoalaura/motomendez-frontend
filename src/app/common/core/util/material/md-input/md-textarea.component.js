'use strict';

const MdTextareaComponent = {
    bindings: {
        label: '@',
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
        <textarea ng-required="$ctrl.required || $ctrl.ngRequired" 
                  ng-disabled="$ctrl.disabled || $ctrl.ngDisabled" 
                  ng-readonly="$ctrl.readonly || $ctrl.ngReadonly" 
                  ng-model="$ctrl.ngModel" 
                  ng-click="$ctrl.ngClick" 
                  ng-change="$ctrl.ngChange" 
                  ng-model-options="$ctrl.ngModelOptions"
                  ng-placeholder="$ctrl.placeholder">{{ $ctrl.ngValue || $ctrl.ngDefault || $ctrl.value || '' }}</textarea>
        <label class="md-control-label" for="textarea">{{ $ctrl.label }}</label>
        <i class="md-bar"></i>
    </div>
    `
};

export default MdTextareaComponent;