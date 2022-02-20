'use strict';

import listadoBonoRegularizado from './listadoBonoRegularizado.component';

const ListadoBonoRegularizadoModule = angular
    .module('app.listadoBonoRegularizado', [])
    .component('listadoBonoRegularizado', listadoBonoRegularizado)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoBonoRegularizado', {
                url: '/listado_bono_regularizado',
                component: 'listadoBonoRegularizado'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default ListadoBonoRegularizadoModule;