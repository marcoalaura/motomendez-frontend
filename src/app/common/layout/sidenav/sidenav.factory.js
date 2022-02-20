'use strict';

const SidenavFactory = function () {

    let factory = {
        user: {
            id: '',
            first_name: '',
            last_name: '',
            cargo: '',
            email: '',
            photo: '',
            nit: '',
            user: ''
        },
        userColor: '',
        menu: [],
        rol: '',
        datosPcd: {},
        visible: true,
        sidenav: true,
        getMenu: function () {
            return this.menu;
        },
        setMenu: function (menu) {
            this.menu = menu;
        },
        getUser: function () {
            return this.user;
        },
        setUser: function (user) {
            this.user = user;
        },
        getRol: function () {
            return this.rol;
        },
        setRol: function (rol) {
            this.rol = rol;
        },
        getVisible: function () {
            return this.visible;
        },
        setVisible: function (visible) {
            this.visible = visible;
        },
        getSidenav: function () {
            return this.sidenav;
        },
        setSidenav: function (sidenav) {
            this.sidenav = sidenav;
        },
        getDatosPcd: function () {
            return this.datosPcd;
        },
        setDatosPcd: function (datosPcd) {
            this.datosPcd = datosPcd;
        }
    };

    return factory;

};

export default SidenavFactory;