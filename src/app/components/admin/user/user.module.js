'use strict';

import UserComponent from './user.component';

const User = angular
    .module('app.user', [])
    .component('appAdminUser', UserComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('user', {
                url: '/usuarios',
                component: 'appAdminUser'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default User;