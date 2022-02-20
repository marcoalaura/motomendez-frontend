'use strict';

import RestaurarComponent from './restaurar.component';

const Restaurar = angular
    .module('app.admin.login.restaurar', [])
    .component('appRestaurar', RestaurarComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('restaurar', {
                url: '/restaurar',
                component: 'appRestaurar'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Restaurar;