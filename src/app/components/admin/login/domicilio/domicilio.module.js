'use strict';

import domicilio from './domicilio.component';

const domicilioModule = angular
    .module('app.domicilio', [])
    .component('domicilio', domicilio)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('domicilio', {
            url: '/domicilio',
            component: 'domicilio'
        });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default domicilioModule;