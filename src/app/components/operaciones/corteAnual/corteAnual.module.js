'use strict';

import operacionCorteAnual from './corteAnual.component';

const OperacionCorteAnualModule = angular
  .module('app.operacionCorteAnual', [])
  .component('operacionCorteAnual', operacionCorteAnual)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('operacionCorteAnual', {
        url: '/operaciones_anual',
        component: 'operacionCorteAnual'
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default OperacionCorteAnualModule;