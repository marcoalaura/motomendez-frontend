'use strict';

const MdSelectComponent = {
    bindings: {
        label: '@',
        required: '@',
        disabled: '@',
        ngRequired: '<',
        ngDisabled: '<',
        ngModel: '=',
        ngModelOptions: '<',
        items: '<',
        groupBy: '@',
        keyText: '@',
        keyValue: '@',
        ngTitle: '@',
        placeholder: '@'
    },
    template: `
    <div class="form-group" ng-if="!$ctrl.keyValue">
        <label for="input" ng-if="$ctrl.label" ng-class="{'ap-req':$ctrl.required||$ctrl.ngRequired}">{{ $ctrl.label }}</label>
        <ui-select
            ng-model="$ctrl.ngModel"
            theme="bootstrap"
            ng-required="$ctrl.required || $ctrl.ngRequired"
            ng-disabled="$ctrl.disabled || $ctrl.ngDisabled"
            title="{{ $ctrl.ngTitle || 'Seleccione un item' }}">
            <ui-select-match placeholder="{{ $ctrl.placeholder || 'Seleccione o busque un item de la lista...' }}">
                {{$select.selected[$ctrl.keyText||'text']}}
            </ui-select-match>
            <ui-select-choices group-by="$ctrl.groupBy" repeat="item in $ctrl.items | filter: $select.search">
                <span ng-bind-html="item[$ctrl.keyText||'text'] | highlight: $select.search"></span>
                <small ng-bind-html="item.code | highlight: $select.search"></small>
            </ui-select-choices>
        </ui-select>
    </div>
    <div class="form-group" ng-if="$ctrl.keyValue">
        <label for="input" ng-if="$ctrl.label" ng-class="{'ap-req':$ctrl.required||$ctrl.ngRequired}">{{ $ctrl.label }}</label>
        <ui-select
            ng-model="$ctrl.ngModel"
            theme="bootstrap"
            ng-required="$ctrl.required || $ctrl.ngRequired"
            ng-disabled="$ctrl.disabled || $ctrl.ngDisabled"
            title="{{ $ctrl.ngTitle || 'Seleccione un item' }}">
            <ui-select-match placeholder="{{ $ctrl.placeholder || 'Seleccione o busque un item de la lista...' }}">
                {{$select.selected[$ctrl.keyText||'text']}}
            </ui-select-match>
            <ui-select-choices group-by="$ctrl.groupBy" repeat="item[$ctrl.keyValue] as item in $ctrl.items | filter: $select.search">
                <span ng-bind-html="item[$ctrl.keyText||'text'] | highlight: $select.search"></span>
                <small ng-bind-html="item.code | highlight: $select.search"></small>
            </ui-select-choices>
        </ui-select>
    </div>
    `
};

export default MdSelectComponent;
