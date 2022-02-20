'use strict';

import informacionPCD from './informacionPCD.component';

const informacionPCDModule = angular
    .module('app.informacionPCD', [])
    .component('informacionPCD', informacionPCD)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('informacionPCD', {
                url: '/informacion_pcd',
                component: 'informacionPCD'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default informacionPCDModule;