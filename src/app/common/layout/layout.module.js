'use strict';

import angular from "angular";

import Sidenav from './sidenav/sidenav.module';
import Breadcrumb from './breadcrumb/breadcrumb.module';
import Loading from './loading/loading.module';

import NavbarComponent from './navbar/navbar.component';
import FooterComponent from './footer/footer.component';

import './layout.css';

const Layout = angular
    .module('app.layout', [ 
        Sidenav,
        Breadcrumb,
        Loading
    ])
    .component('appNavbar', NavbarComponent) 
    .component('appFooter', FooterComponent) 
    .name;

export default Layout;