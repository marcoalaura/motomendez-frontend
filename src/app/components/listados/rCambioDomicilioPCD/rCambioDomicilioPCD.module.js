'use strict';

import rCambioDomicilioPCD from './rCambioDomicilioPCD.component';

const rCambioDomicilioPCDModule = angular
    .module('app.rCambioDomicilioPCD', [])
    .component('rCambioDomicilioPCD', rCambioDomicilioPCD)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('rCambioDomicilioPCD', {
                url: '/reg_cambio_municipio',
                component: 'rCambioDomicilioPCD'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default rCambioDomicilioPCDModule;