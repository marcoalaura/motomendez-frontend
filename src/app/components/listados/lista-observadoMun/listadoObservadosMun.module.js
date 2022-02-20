'use strict';

import listadoObservadosMun from './listadoObservadosMun.component';

const listadoObservadosMun_Module = angular
    .module('app.listadoObservadosMun', [])
    .component('listadoObservadosMun', listadoObservadosMun)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoObservadosMun', {
                url: '/listado_general_municipio',
                component: 'listadoObservadosMun'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default listadoObservadosMun_Module;