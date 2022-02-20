'use strict';

import controller from './c-radiobutton.controller';

const CRadioButtonComponent = {
  bindings: {
    name: '@',
    label: '@',
    ngModel: '=',
    ngDisabled: '=',
    ngRequired: '=',
    options: '=',
    field:'@'
  },
  require: {
          form: '^form',
  },
  template: `
    <div class="my-1">
      <label ng-if="$ctrl.label" class="form-control-label label-input" ng-class="{'requerido': $ctrl.ngRequired, 'label-valido': $ctrl.form[$ctrl.name].$valid, 'label-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}">
        {{$ctrl.label}}
      </label>
    <div class="form">
      <div ng-repeat="option in $ctrl.options" class="mt-1 mb-1">
        <label class="custom-control custom-radio">
          <input name="{{$ctrl.name}}" 
               type="radio" 
               class="form-check-input"
               ng-class="" 
               ng-model="$ctrl.ngModel" 
               value="{{option[$ctrl.field]}}"
               ng-required="$ctrl.ngRequired"
               ng-disabled="$ctrl.ngDisabled">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{option[$ctrl.field]}}</span>
        </label>
      </div>
    </div>
    <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
    <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
      <small class="form-text text-muted text-danger">
         El campo {{'"'+$ctrl.label+'"' || ''}} es requerido.
      </small>
    </div>
  </div>
    </div>
  `,
  controller
};

export default CRadioButtonComponent;
