'use strict';

import operacionesCorte from './operacionesCorte.component';

// TODO: Corregir la forma en que funciona esta ruta
const OperacionesCorteModule = angular 
    .module('app.operacionesCorte', [])
    .component('operacionesCorte', operacionesCorte)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('operacionesCorte', {
                url: '/operaciones_anual/operaciones/:gestion',
                component: 'operacionesCorte'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default OperacionesCorteModule;
