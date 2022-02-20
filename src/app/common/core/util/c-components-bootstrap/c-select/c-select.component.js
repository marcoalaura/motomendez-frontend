'use strict';

import controller from './c-select.controller';
//import './ui-select.scss';
const CSelectComponent = {
  bindings: {
    name: '@',
    label: '@',
    placeholder: '@',
    ngModel: '=',
    ngChange: '&',
    onSelect: '&',
    ngDisabled: '=',
    ngRequired: '=',
    options: '<',
    field: '@'
  },
  require: {
    form: '^form',
  },
  template: `
  <div class="form-group mb-0 pb-0">
    <label for="input" class="form-control-label label-input" ng-class="{'requerido': $ctrl.ngRequired, 'label-valido': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), 'label-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}">{{$ctrl.label}}</label>
    <ui-select name="{{$ctrl.name}}"
             on-select="$ctrl.onSelect({item:$item})"
             ng-change="$ctrl.ngChange()"
             ng-model="$ctrl.ngModel"
             theme="bootstrap"
             class="form-control px-0 py-0"
             ng-class="{'is-invalid': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'is-valid': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), '': $ctrl.ngDisabled && !$ctrl.ngRequired}"
             ng-required="$ctrl.ngRequired"
             ng-disabled="$ctrl.ngDisabled">
    <ui-select-match placeholder="{{$ctrl.placeholder}}">{{$select.selected[$ctrl.field]}}</ui-select-match>
    <ui-select-choices repeat="item in $ctrl.options | filter: $select.search">
      <span ng-bind-html="item[$ctrl.field] | highlight: $select.search"></span>
    </ui-select-choices>
    <ui-select-no-choice>
      <small style="padding: 0 10px;color: #f35958 !important" class="form-text text-muted">
        No se encontraron coincidencias
      </small>
    </ui-select-no-choice>
    </ui-select>
  </div>
  <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
  <div ng-message="required">
    <small class="form-text text-muted text-danger">
    El campo {{'"'+$ctrl.label+'"' || ''}} es requerido.
    </small>
  </div>
</div>
  `,
  controller
};

export default CSelectComponent;
