'use strict';

import cambioDomicilioPCD from './cambioDomicilioPCD.component';

const cambioDomicilioPCDModule = angular
    .module('app.cambioDomicilioPCD', [])
    .component('cambioDomicilioPCD', cambioDomicilioPCD)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('cambioDomicilioPCD', {
                url: '/cambio_municipio',
                component: 'cambioDomicilioPCD'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default cambioDomicilioPCDModule;