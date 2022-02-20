'use strict';

import controller from './c-input.controller';
import './c-input.scss';
const CInputComponent = {
  bindings: {
    name: '@',
    label: '@',
    ngModel: '=',
    ngDisabled: '=',
    ngRequired: '=',
    ngValidation: '@',
    ngMinlength: '@',
    ngMaxlength: '@',
  },
  require: {
    form: '^form',
  },
  template: `
     <div class="md-form-group" md-event-label>
        <input name="{{$ctrl.name}}"
               ng-required="$ctrl.ngRequired"
               ng-disabled="$ctrl.ngDisabled"
               ng-readonly="$ctrl.ngReadonly"
               ng-model="$ctrl.ngModel"
               ng-pattern="$ctrl.validation"
               ng-minlength="$ctrl.ngMinlength",
               ng-maxlength="$ctrl.ngMaxlength"
               type="text"
               >
        <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" for="input">{{ $ctrl.label }}</label>
        <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
        <div ng-message="pattern">
            <small class="form-text text-muted text-danger font-weight-bold">
             {{$ctrl.messageErrorPattern}}
            </small>
        </div>
        <div ng-message="minlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy corto.
            </small>
        </div>
        <div ng-message="maxlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy largo.
            </small>
        </div>
    </div>
    </div>`,
  controller
};

export default CInputComponent;
