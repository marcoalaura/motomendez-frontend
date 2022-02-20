'use strict';

import SidenavComponent from './sidenav.component';
import SidenavService from './sidenav.service';
import SidenavFactory from './sidenav.factory';
import ToggleMenu from './toggle-menu.directive';

const Sidenav = angular
    .module('app.sidenav', [])
    .service('Sidenav', SidenavService)
    .component('appSidenav', SidenavComponent) 
    .directive('toggleMenu', () => new ToggleMenu())
    .factory('SidenavFactory', SidenavFactory)
    .name;

export default Sidenav;