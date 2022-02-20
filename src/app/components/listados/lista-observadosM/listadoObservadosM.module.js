'use strict';

import listadoObservadosM from './listadoObservadosM.component';

const listadoObservadosM_Module = angular
    .module('app.listadoObservadosM', [])
    .component('listadoObservadosM', listadoObservadosM)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoObservadosM', {
                url: '/listado_general_mes',
                component: 'listadoObservadosM'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default listadoObservadosM_Module;