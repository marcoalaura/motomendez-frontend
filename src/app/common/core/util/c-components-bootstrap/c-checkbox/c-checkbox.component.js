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
    <div class="my-3">
      <label class="custom-control custom-checkbox">
      <input type="checkbox" 
             class="custom-control-input mb-0 pb-0" 
             ng-class="{'is-invalid': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'is-valid': $ctrl.form[$ctrl.name].$valid}"
             name="$ctrl.name" 
             ng-model="$ctrl.ngModel" 
             ng-required="$ctrl.ngRequired" 
             ng-disabled="$ctrl.ngDisabled">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">{{$ctrl.label}}</span>
      </label>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger">
            El campo es requerido.
          </small>
        </div>
      </div>
        </div>
      `,
  controller
};

export default CCheckboxComponent;
