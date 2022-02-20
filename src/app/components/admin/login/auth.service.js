//import { log } from "util";

'use strict';

class AuthService {

    constructor($http, $auth, $location, $rootScope, Filter, $uibModalStack, Storage, SidenavFactory, BreadcrumbFactory, Util, timeSessionExpired, Message, $log) {
        "ngInject";

        this.$http = $http;
        this.$auth = $auth;
        this.$rootScope = $rootScope;
        this.$uibModalStack = $uibModalStack;
        this.$location = $location;
        this.Storage = Storage;
        this.Util = Util;
        this.Message = Message;
        this.Filter = Filter;
        this.$log = $log;
        this.SidenavFactory = SidenavFactory;
        this.BreadcrumbFactory = BreadcrumbFactory;
        this.timeSessionExpired = timeSessionExpired;
    }

    signin(data) {
        if (this.Filter.empty(data.username) || this.Filter.empty(data.password)) {
            return false;
        }
        this.$auth.login(data)
        .then(response => {
            let user = response.data.datos.usuario;
            let menu = response.data.datos.menu;
            let rol = user.id_rol;
            data.path = response.data.datos.menuEntrar || 'dashboard';
            let pathRedirect = response.data.datos.path || data.path;
            user.pathLogin = data.pathLogin || 'login';

            this.$rootScope.auth = true;

            // Set user
            user.pathInicio = pathRedirect;
            this.SidenavFactory.setUser(user);
            this.Storage.setUser(user);

            // Set Menu
            this.SidenavFactory.setMenu(menu);
            this.Storage.set('menu', this.SidenavFactory.getMenu());

            // Set rol
            this.SidenavFactory.setRol(rol);
            this.Storage.set('rol', this.SidenavFactory.getRol());

            // Set Visible
            this.SidenavFactory.setVisible(data.menu === undefined ? true : data.menu);
            this.Storage.set('visible', this.SidenavFactory.getVisible());

            // Set Sidenav
            this.SidenavFactory.setSidenav(data.sidenav === undefined ? true : data.sidenav);
            this.Storage.set('sidenav', this.SidenavFactory.getSidenav());

            let path = pathRedirect || this.Storage.get('path');

            if (path) {
                let route = path.replace('/', '');

                // Set breadcrumb
                let page = this.Util.getMenuOption(this.Storage.get('menu'), route);
                this.BreadcrumbFactory.setParent(page[0]);
                this.BreadcrumbFactory.setCurrent(page[1]);
            }

            this.timerSession();

            // Redirect to dashboard
            this.$location.path(path && path.indexOf('login') == -1? path : (data.path || '/'));
        }).catch(error => {
            if (error.data && error.data.mensaje) {
                this.Message.error(error.data.mensaje);
            } else {
                this.Message.error('Los datos ingresados son incorrectos o su cuenta no está registrada, revise sus datos.');
            }
        });
    }

    timerSession() {
        // Definiendo el tiempo en el que dura una sesión sin actividad
        angular.TIME = this.timeSessionExpired * 60;
        var ctrl = this;
        angular.sessionInterval = window.setInterval(function () {
            angular.TIME--;
            if (angular.TIME <= 0) {
                angular.expired = true;
                ctrl.logout();
            }
        }, 1000);
    }

    logout() {
        let pathLogin = 'login';
        if (this.Storage.existUser() && this.Storage.getUser() && this.Storage.getUser().pathLogin) {
            pathLogin = this.Storage.getUser().pathLogin;
        }

        this.$auth.logout()
        .then(() => {

            if (angular.sessionInterval) {
                window.clearInterval(angular.sessionInterval);
                angular.sessionInterval = null;
            }

            setTimeout(() => {
                this.$uibModalStack.dismissAll('Cerrando sesión');
            }, 1000);

            this.Storage.removeUser();
            this.Storage.remove('menu');
            this.Storage.remove('visible');
            this.Storage.remove('rol');
            this.Storage.remove('sidenav');
            this.Storage.remove('dateNow');
            this.Storage.remove('user');
            this.Storage.remove('token');
            // this.Storage.remove('path');

            this.SidenavFactory.setUser({});
            this.SidenavFactory.setMenu([]);
            this.SidenavFactory.setVisible(false);

            if (angular.expired) {
                this.Storage.set('expired', true);
                delete angular.expired;
            }
            this.$location.path(pathLogin);
        });
    }

    isAuthenticated () {
        return this.$auth.isAuthenticated();
    }
}

export default AuthService;
