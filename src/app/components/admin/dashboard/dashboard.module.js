'use strict';

import DashboardComponent from './dashboard.component';

const Dashboard = angular
    .module('app.admin.dashboard', [])
    .component('appDashboard', DashboardComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                component: 'appDashboard'
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Dashboard;