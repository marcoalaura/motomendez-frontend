'use strict';

import listadoBonoMunicipio from './listadoMunicipio.component';

const ListadoBonoModule = angular
    .module('app.listadoBonoMunicipio', [])
    .component('listadoBonoMunicipio', listadoBonoMunicipio)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('listadoBonoMunicipio', {
                url: '/listado_municipio',
                component: 'listadoBonoMunicipio'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default ListadoBonoModule;