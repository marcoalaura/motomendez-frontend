'use strict';

import listadogeneral from './listado-general.component';

const ListadoGeneralModule = angular
    .module('app.listadogeneral', [])
    .component('listadogeneral', listadogeneral)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadogeneral', {
                url: '/listado_general',
                component: 'listadogeneral'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default ListadoGeneralModule;