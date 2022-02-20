'use strict';

import operacionesCorteMensual from './operacionesCorteMensual.component';

// TODO: Corregir la forma en que funciona esta ruta
const OperacionesCorteMensualModule = angular 
    .module('app.operacionesCorteMensual', [])
    .component('operacionesCorteMensual', operacionesCorteMensual)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('operacionesCorteMensual', {
                url: '/operaciones_mensual/operaciones/:gestion',
                component: 'operacionesCorteMensual'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default OperacionesCorteMensualModule;
