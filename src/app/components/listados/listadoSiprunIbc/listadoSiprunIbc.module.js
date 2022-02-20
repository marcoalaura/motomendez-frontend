'use strict';

import listadoSiprunIbc from './listadoSiprunIbc.component';

const listadoSiprunIbcModule = angular
  .module('app.listadoSiprunIbc', [])
  .component('listadoSiprunIbc', listadoSiprunIbc)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('listadoSiprunIbc', {
        url: '/listado_siprun_ibc',
        component: 'listadoSiprunIbc'
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default listadoSiprunIbcModule;
