'use strict';

const MdSelectComponent = {
    bindings: {
        label: '@',
        required: '@',
        ngRequired: '@',
        disabled: '@',
        ngDisabled: '@',
        ngModel: '=',
        ngChange: '<',
        ngModelOptions: '<',
        items: '<'
    },
    template: `
    <div class="md-form-group">
        <select ng-required="$ctrl.required || $ctrl.ngRequired" 
                ng-disabled="$ctrl.disabled || $ctrl.ngDisabled"  
                ng-model="$ctrl.ngModel" 
                ng-change="$ctrl.ngChange" 
                ng-model-options="$ctrl.ngModelOptions">
            <option value="{{ item.value }}" ng-if="item.value" ng-repeat="item in $ctrl.items">{{item.text}}</option>
        </select>
        <label class="md-control-label" for="select">{{ $ctrl.label }}</label>
        <i class="md-bar"></i>
    </div>
    `
};

export default MdSelectComponent;