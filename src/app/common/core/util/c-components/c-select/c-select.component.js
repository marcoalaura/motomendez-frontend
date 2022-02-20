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
      <div class="md-form-group espacio-comprimido md-select-group" md-event-label>
          <ui-select name="{{$ctrl.name}}"
                     on-select="$ctrl.onSelect({item:$item})"
                     ng-change="$ctrl.ngChange()"
                     ng-model="$ctrl.ngModel"
                     theme="bootstrap"
                     class="md-select"
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
          <label for="input" class="md-control-label" ng-class="{'requerido':$ctrl.ngRequired}">{{$ctrl.label}}</label>
          <i class="md-bar" ng-class="{'error':$ctrl.form[$ctrl.name].$invalid && $ctrl.form[$ctrl.name].$touched,'sin-error':!$ctrl.form[$ctrl.name].$invalid}"></i>
              </div>
         <div ng-messages="$ctrl.form[$ctrl.name].$error" ng-if="$ctrl.form[$ctrl.name].$touched" role="alert">
        <div ng-message="required">
          <small class="form-text text-muted text-danger font-weight-bold">
             El campo es requerido.
          </small>
        </div>

        </div>
    `,
  controller
};

export default CSelectComponent;
