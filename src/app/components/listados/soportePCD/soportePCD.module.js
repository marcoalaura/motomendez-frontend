'use strict';

import soportePCD from './soportePCD.component';

const soportePCDModule = angular
    .module('app.soportePCD', [])
    .component('soportePCD', soportePCD)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('soportePCD', {
                url: '/soporte',
                component: 'soportePCD'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default soportePCDModule;