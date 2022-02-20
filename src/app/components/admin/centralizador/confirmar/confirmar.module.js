'use strict';

import ConfirmarCuentaComponent from './confirmar.component';
const ConfirmarCue = angular
.module('app.confirmar', [])
.component('confirmarCuenta', ConfirmarCuentaComponent)
.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('confirmarCuenta', {
    url: `/confirmar_cuenta/:codigo`,
    component: 'confirmarCuenta'
  })
  ;
  $urlRouterProvider.otherwise('/');

})
.name;

export default ConfirmarCue;