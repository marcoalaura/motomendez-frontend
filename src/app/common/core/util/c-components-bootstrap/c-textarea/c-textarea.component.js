'use strict';

import controller from './c-textarea.controller';

const CTextareaComponent = {
  bindings:{
    name: '@',
    label: '@',
    ngModel: '=',
    ngDisabled: '=',
    ngRequired: '=',
    rows: '@?',
    ngMinlength: '@?',
    ngMaxlength: '@?'
  },
  require:{
    form:'^form'
  },
  template:
  `     <div class="my-1 form-group">
        <label class="" ng-class="{'requerido':$ctrl.ngRequired}" for="textarea"
        ng-class="{'requerido': $ctrl.ngRequired, 'label-valido': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), 'label-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}">{{ $ctrl.label }}</label>
        <textarea name="{{$ctrl.name}}"
                  ng-required="$ctrl.ngRequired"
                  ng-disabled="$ctrl.ngDisabled"
                  ng-readonly="$ctrl.ngReadonly"
                  ng-model="$ctrl.ngModel"
                  ng-minlength="$ctrl.ngMinlength",
                  ng-maxlength="$ctrl.ngMaxlength"
                  rows="{{$ctrl.rows}}"
                  class="form-control"
                  ng-class="{'is-invalid': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'is-valid': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), '': $ctrl.ngDisabled && !$ctrl.ngRequired}">
        </textarea>
        <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
        <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched && !$ctrl.form[$ctrl.name].$valid" role="alert">
              <div ng-message="required">
                <small class="form-text text-muted text-danger">
                  El campo es requerido.
                </small>
              </div>
              <div ng-message="minlength">
                <small class="form-text text-muted text-danger">
                  El contenido es muy corto.
                </small>
              </div>
               <div ng-message="maxlength">
                <small class="form-text text-muted text-danger">
                  El contenido es muy largo.
                </small>
              </div>
          </div>
      </div>
  `,
  controller
};

export default CTextareaComponent;
