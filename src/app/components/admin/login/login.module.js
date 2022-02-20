'use strict';

import LoginComponent from './login.component';
import AuthService from './auth.service';
import Restaurar from './restaurar/restaurar.module';
import Cambiar from './cambiar/cambiar.module';
import Domicilio from './domicilio/domicilio.module';
import './login.css';

const Login = angular
    .module('app.login', [Restaurar, Cambiar, Domicilio,])
    .service('Auth', AuthService)
    .component('appAdminLogin', LoginComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('login', {
                url: '/',
                component: 'appAdminLogin'
            })
            .state('logout', {
                url: '/logout',
                controller: (Auth) => {
                    Auth.logout();
                }
            });
        $urlRouterProvider.otherwise('/');
    })
    .name;

export default Login;