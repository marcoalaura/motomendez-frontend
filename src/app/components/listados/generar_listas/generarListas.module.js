'use strict';

import generarListas from './generarListas.component';

const generarListasModule = angular
    .module('app.generarListas', [])
    .component('generarListas', generarListas)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('generarListas', {
                url: '/generar_lista',
                component: 'generarListas'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default generarListasModule;