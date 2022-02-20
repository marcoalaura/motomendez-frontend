'use strict';

import controller from './c-input-money.controller';
const CInputMoneyComponent = {
  bindings: {
      name: '@',
      label: '@',
      ngModel: '=',
      ngDisabled: '=',
      ngRequired: '=',
      placeholder: '@?',
      ngValidation: '@',
      ngMinvalue: '@',
      ngMaxvalue: '@',
  },
  require: {
    form: '^form',
  },
  template: `
     <div class="md-form-group">
      <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" style="top:-1rem;font-size:11px;">{{$ctrl.label}}</label>
      <div class="input-group">
        <input ng-required="$ctrl.ngRequired"
               ng-disabled="$ctrl.ngDisabled"
               ng-readonly="$ctrl.ngReadonly"
               ng-model="$ctrl.ngModel"
               ng-maxlength="$ctrl.ngMaxlength"
               ng-placeholder="$ctrl.placeholder"
               name="{{$ctrl.name}}"
               type="text"
               numerico
               min="$ctrl.ngMinvalue"
               max="$ctrl.ngMaxvalue"
               >
        <button type="button" class="btn btn-link p-0 m-0"><i class="fa fa-money" aria-hidden="true"></i></button>
      </div>
      
        <i class="md-bar"></i>
      <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
        <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>
        <div ng-message="maxlength">
            <small class="form-text text-muted text-danger font-weight-bold">
             El contenido es muy largo.
            </small>
        </div>
        <div ng-message="nombre">
            <small class="form-text text-muted text-danger font-weight-bold">
             El texto no debe contener .{{}}
            </small>
        </div>
    </div>
    </div>`,
  controller

};

export default CInputMoneyComponent;
