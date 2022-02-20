'use strict';

import listadoObservadosAnual from './listadoObservadosAnual.component';

const listadoObservadosAnual_Module = angular
    .module('app.listadoObservadosAnual', [])
    .component('listadoObservadosAnual', listadoObservadosAnual)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoObservadosAnual', {
                url: '/listado_general_anual',
                component: 'listadoObservadosAnual'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default listadoObservadosAnual_Module;