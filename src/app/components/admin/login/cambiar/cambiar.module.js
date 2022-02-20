'use strict';

import CambiarComponent from './cambiar.component';

const Cambiar = angular
    .module('app.cambiar', [])
    .component('appCambiar', CambiarComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
        .state('cambiar', {
            url: '/cambiar',
            component: 'appCambiar'
        });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Cambiar;