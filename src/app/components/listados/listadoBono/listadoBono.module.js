'use strict';

import listadoBono from './listadoBono.component';

const ListadoBonoModule = angular
    .module('app.listadoBono', [])
    .component('listadoBono', listadoBono)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoBono', {
                url: '/listado_bono',
                component: 'listadoBono'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default ListadoBonoModule;