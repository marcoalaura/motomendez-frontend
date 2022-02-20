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

  template:`
      <div class="md-form-group">
       <label class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}" style="top:-1rem;font-size:11px;">{{$ctrl.label}}</label>
             <div class="input-group">
                <input type="text"
                       name="{{$ctrl.name}}"
                       class=""
                       ui-mask="99/99/9999"
                       maxlength="10"
                       ng-disabled="$ctrl.ngDisabled"
                       ng-required="$ctrl.ngRequired"
                       model-view-value="true"
                       ng-model="$ctrl.ngModel"
                       init-date="$ctrl.initDate"
                       ng-model-options="{ getterSetter: true }"
                       uib-datepicker-popup="dd/MM/yyyy"
                       is-open="expandirCalendario"
                       datepicker-options="$ctrl.options"
                       ng-change="$ctrl.ngChange({data:$ctrl.ngModel})"
                       ui-validate="{minDate: '$ctrl.verifyMinDate($value)', maxDate: '$ctrl.verifyMaxDate($value)'}"
                       min-date="$ctrl.minDate"
                       max-date="$ctrl.maxDate"
                      >
            <button type="button" class="btn btn-link p-0 m-0" ng-click="expandirCalendario = !expandirCalendario"><i class="fa fa-calendar"></i></button>
            </div>
            <span class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></span>
            <div ng-messages="$ctrl.form[$ctrl.name].$error" role="alert">
            <div ng-message="required">
              <small class="form-text text-muted text-danger font-weight-bold" ng-if="$ctrl.form[$ctrl.name].$touched">
                El campo es requerido.
              </small>
            </div>
            <div ng-message="date">
              <small class="form-text text-muted text-danger font-weight-bold">
              Introduzca una fecha válida dd/MM/YYYY.
              </small>
            </div>
             <div ng-message="minDate">
              <small class="form-text text-muted text-danger font-weight-bold">
               La fecha debe ser mayor a {{$ctrl.minDate | date:'dd/MM/yyyy'}}).
              </small>
            </div>
            <div ng-message="maxDate">
              <small class="form-text text-muted text-danger font-weight-bold">
               La fecha debe ser menor a {{$ctrl.maxDate | date:'dd/MM/yyyy'}}).
              </small>
            </div>
        </div>
    </div>`,
  controller
};

export default CDateComponent;
