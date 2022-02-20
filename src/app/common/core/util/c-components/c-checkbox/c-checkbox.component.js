'use strict';

import controller from './c-checkbox.controller';

const CCheckboxComponent = {
  bindings: {
    name: '@',
    label: '@',
    ngModel: '=',
    ngDisabled: '=',
    ngRequired: '=',
  },
  require: {
    form: '^form',
  },
  template: `
    <label class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" name="$ctrl.name" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired" ng-req ng-disabled="$ctrl.ngDisabled">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">{{$ctrl.label}}</span>
    </label>
    <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
      <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
        <small class="form-text text-muted text-danger font-weight-bold">
           El campo es requerido.
        </small>
      </div>
    </div>
      `,
  controller
};

export default CCheckboxComponent;
