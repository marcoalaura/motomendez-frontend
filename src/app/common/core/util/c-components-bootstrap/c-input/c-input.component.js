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
    isPassword: '@',
    icon: '@',
    placeholder: '@',
  },
  require: {
    form: '^form',
  },
  template: `
    <div class="my-1">
      <label class="form-control-label label-input" 
             ng-class="{'requerido': $ctrl.ngRequired, 'label-valido': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), 'label-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}"> 
        {{$ctrl.label}}
      </label>
      <div class="input-group mb-0 pb-0">
        <span class="input-group-addon" ng-if="$ctrl.icon" ng-class="{'icono-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'icono-valido': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), '': $ctrl.ngDisabled && !$ctrl.ngRequired}">
          <i class="fa fa-{{$ctrl.icon}} fa-lg px-2"></i>
        </span>
        <input name="{{$ctrl.name}}" 
               placeholder="{{$ctrl.placeholder}}"
               type="{{$ctrl.tipo}}" 
               class="form-control"
               ng-class="{'is-invalid': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'is-valid': ($ctrl.form[$ctrl.name].$valid && $ctrl.ngRequired && !$ctrl.ngDisabled) || ($ctrl.form[$ctrl.name].$valid && $ctrl.ngModel && $ctrl.ngDisabled), '': $ctrl.ngDisabled && !$ctrl.ngRequired}"
               ng-model="$ctrl.ngModel"
               ng-required="$ctrl.ngRequired"
               ng-disabled="$ctrl.ngDisabled"
               ng-pattern="$ctrl.validation"
               ng-maxlength="$ctrl.ngMaxlength"
               ng-minlength="$ctrl.ngMinlength"
               maxlength="$ctrl.ngMaxlength">
      <span class="input-group-btn" ng-if="$ctrl.ngModel && !$ctrl.ngDisabled" style="background:white; border-left:0px;" ng-click="$ctrl.borrar()">
        <button class="btn btn-link" type="button">
          <i class="fa fa-times fa-lg px-2"></i>
        </button>
      </span>
      </div>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger">
            El campo {{'"'+$ctrl.label+'"' || ''}} es requerido.
          </small>
        </div>
        <div ng-message="pattern">
          <small class="form-text text-muted text-danger">
          {{$ctrl.messageErrorPattern}}
          </small>
        </div>
        <div ng-message="minlength">
          <small class="form-text text-muted text-danger">
          El contenido del campo {{'"'+$ctrl.label+'"' || ''}} es muy corto.
          </small>
        </div>
        <div ng-message="maxlength">
          <small class="form-text text-muted text-danger">
          El contenido del campo {{'"'+$ctrl.label+'"' || ''}} es muy largo.
          </small>
        </div>
      </div>
    </div>
  `,
  controller
};

export default CInputComponent;







