'use strict';

import controller from './c-date.controller';

const CDateComponent = {
  bindings:{
    name: '@',
    label: '@',
    ngModel: '=',
    ngDisabled: '=',
    ngRequired: '=',
    minDate: '=?',
    maxDate: '=?',
    ngChange: '&',
    initDate: '<'
  },
  require:{
    form: '^form'
  },
  template: `
  <div class="my-1">
    <label class="form-control-label label-input" ng-class="{'requerido': $ctrl.ngRequired, 'label-valido': $ctrl.form[$ctrl.name].$valid, 'label-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}"> 
      <i class="fa fa-{{$ctrl.icon}}"></i>{{$ctrl.label}}
    </label>
    <div class="input-group">
      <button type="button" class="btn btn-link input-group-addon px-3 py-2" ng-click="expandirCalendario = !expandirCalendario" ng-class="{'icono-valido': $ctrl.form[$ctrl.name].$valid, 'icono-invalido': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern}"><i class="fa fa-calendar"></i></button>
      <input name="{{$ctrl.name}}" 
      type="text" 
      class="form-control"
      ng-class="{'is-invalid': ($ctrl.form[$ctrl.name].$touched && $ctrl.form[$ctrl.name].$invalid) || $ctrl.form[$ctrl.name].$error.pattern , 'is-valid': $ctrl.form[$ctrl.name].$valid}"
      ng-model="$ctrl.ngModel"
      ng-required="$ctrl.ngRequired"
      ng-disabled="$ctrl.ngDisabled"
      ui-mask="99/99/9999"
      maxlength="10"
      model-view-value="true"
      ng-model-options="{ getterSetter: true }"
      uib-datepicker-popup="dd/MM/yyyy"
      is-open="expandirCalendario"
      datepicker-options="$ctrl.options"
      ng-change="$ctrl.ngChange({data:$ctrl.ngModel})"
      ui-validate="{minDate: '$ctrl.verifyMinDate($value)', maxDate: '$ctrl.verifyMaxDate($value)'}"
      min-date="$ctrl.minDate"
      max-date="$ctrl.maxDate">
    </div>
 
    <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
      <div ng-message="required"  ng-if="$ctrl.form[$ctrl.name].$touched">
        <small class="form-text text-muted text-danger">
          El campo {{'"'+$ctrl.label+'"' || ''}} es requerido.
        </small>
      </div>
      <div ng-message="date">
        <small class="form-text text-muted text-danger">
        Introduzca una fecha válida dd/MM/YYYY.
        </small>
      </div>
       <div ng-message="minDate">
        <small class="form-text text-muted text-danger">
         La fecha debe ser mayor a {{$ctrl.minDate | date:'dd/MM/yyyy'}}).
        </small>
      </div>
      <div ng-message="maxDate">
        <small class="form-text text-muted text-danger">
         La fecha debe ser menor a {{$ctrl.maxDate | date:'dd/MM/yyyy'}}).
        </small>
      </div>
    </div>
  </div>
  `,
  controller
};

export default CDateComponent;
