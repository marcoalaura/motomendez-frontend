'use strict';

const Formly = angular
    .module('vendor.formly', [])
    .run(function(formlyConfig, formlyValidationMessages) {
        'ngInject';
        /* Datepicker */

        var attributes = [
            'date-disabled',
            'custom-class',
            'show-weeks',
            'starting-day',
            'init-date',
            'min-mode',
            'max-mode',
            'format-day',
            'format-month',
            'format-year',
            'format-day-header',
            'format-day-title',
            'format-month-title',
            'year-range',
            'shortcut-propagation',
            'datepicker-popup',
            'show-button-bar',
            'current-text',
            'clear-text',
            'close-text',
            'close-on-date-selection',
            'datepicker-append-to-body'
        ];

        var bindings = [
            'datepicker-mode',
            'min-date',
            'max-date'
        ];

        var ngModelAttrs = {};

        angular.forEach(attributes, function(attr) {
            ngModelAttrs[camelize(attr)] = {attribute: attr};
        });

        angular.forEach(bindings, function(binding) {
            ngModelAttrs[camelize(binding)] = {bound: binding};
        });

        formlyConfig.setType({
            name: 'datepicker',
            template: `
                <p class="input-group">
                    <input  type="text"
                            id="{{::id}}"
                            name="{{::id}}"
                            ng-model="model[options.key]"
                            class="form-control"
                            ng-click="datepicker.open($event)"
                            uib-datepicker-popup="{{to.datepickerOptions.format}}"
                            is-open="datepicker.opened"
                            datepicker-options="to.datepickerOptions" />
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default" ng-click="datepicker.open($event)" ng-disabled="to.disabled"><i class="fa fa-calendar"></i></button>
                    </span>
                </p>
            `,
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {
                    datepickerOptions: {
                        format: 'dd/MM/yyyy',
                        initDate: new Date()
                    }
                }
            },
            controller: ['$scope', function ($scope) {
                $scope.datepicker = {};
                $scope.datepicker.opened = false;

                $scope.datepicker.open = function ($event) {
                    $scope.datepicker.opened = !$scope.datepicker.opened;
                };
            }]
        });

        /* timepicker */

        ngModelAttrs = {};

        angular.forEach([
            'meridians',
            'readonly-input',
            'mousewheel',
            'arrowkeys'
        ], function(attr) {
            ngModelAttrs[camelize(attr)] = {attribute: attr};
        });

        angular.forEach([
            'hour-step',
            'minute-step',
            'show-meridian'
        ], function(binding) {
            ngModelAttrs[camelize(binding)] = {bound: binding};
        });

        formlyConfig.setType({
            name: 'timepicker',
            template: '<timepicker ng-model="model[options.key]"></timepicker>',
            wrapper: ['bootstrapLabel', 'bootstrapHasError'],
            defaultOptions: {
                ngModelAttrs: ngModelAttrs,
                templateOptions: {
                    datepickerOptions: {}
                }
            }
        });

        function camelize(string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });

            return string.replace(/^([A-Z])/, function(match, chr) {
                return chr ? chr.toLowerCase() : '';
            });
        }

        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

        formlyValidationMessages.addStringMessage('required', 'El campo es obligatorio');
    })
    .name;

export default Formly;