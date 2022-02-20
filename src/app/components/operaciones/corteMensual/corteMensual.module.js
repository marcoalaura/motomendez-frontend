'use strict';

import operacionCorteMensual from './corteMensual.component';

const CorteMensualModule = angular
  .module('app.operacionCorteMensual', [])
  .component('operacionCorteMensual', operacionCorteMensual)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('operacionCorteMensual', {
        url: '/operaciones_mensual',
        component: 'operacionCorteMensual'
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

export default CorteMensualModule;