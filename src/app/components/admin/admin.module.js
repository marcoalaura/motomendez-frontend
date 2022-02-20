'use strict';

import Dashboard from './dashboard/dashboard.module';
import Login from './login/login.module';
import User from './user/user.module';
import Confirmar from './centralizador/confirmar/confirmar.module';
import Domicilio from './login/domicilio/domicilio.module';

const Admin = angular
    .module('app.admin', [
        Dashboard,
        Login,
        User,
        Confirmar,
        Domicilio
    ])
    .name;

export default Admin;