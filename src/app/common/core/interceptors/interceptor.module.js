'use strict';

const Interceptor = angular
    .module('app.interceptors', [])
    .factory('AuthInterceptor', function ($q, $injector, timeSessionExpired) {
        'ngInject';
        return {
            'request': function(config) {

                // Actualizando el tiempo de sesión de inactividad
                if (angular.TIME) {
                    angular.TIME = timeSessionExpired * 60;
                }

                // Agregando cabecera para evitar ataque CSRF
                // if(config.url.indexOf('http://test-routes.herokuapp.com') != -1) {
                //     config.headers['x-csrf-token'] = 'lalalalala';
                // }

                return config;
            },

            'requestError': function(rejection) {
                
                return $q.reject(rejection);
            },

            'response': function(response) {

                return response;
            },

            'responseError': function(rejection) {
                
                // Cerrando sesión si no se tiene permisos de acceso
                if (rejection.status === 403) {
                    let Auth = $injector.get('Auth');
                    Auth.logout();
                }
                return $q.reject(rejection);
            }
        };
    })
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .name;

export default Interceptor;