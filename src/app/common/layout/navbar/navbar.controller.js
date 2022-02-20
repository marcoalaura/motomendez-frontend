'use strict';

class NavbarController {
    constructor($state, Util, Auth, $log, $location, Sidenav) {
        "ngInject";

        this.$state = $state;
        this.Util = Util;
        this.Auth = Auth;
        this.$log = $log;
        this.$location = $location;
        this.Sidenav = Sidenav;
    }

    $onInit() {

    }

    toggleSidenav() {
        document.querySelector('#app-sidenav').classList.toggle('sidenav-close');
    }

    fullscreen() {
        document.querySelector('body').classList.toggle('fullscreen');
        this.Util.fullscreen();
    }

    refresh() {
        this.$state.reload();
    }

    toggled(open) {
        this.$log.log('open', open);
    }

    logout() {
        this.Auth.logout();
    }

    account() {
        this.Sidenav.path("account");
    }

    cambiaPass() {
        this.Sidenav.path('cambiar');
    }
}

export default NavbarController;