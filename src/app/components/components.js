'use strict';

import Admin from './admin/admin.module';
import Listados from './listados/listados.module';
import Operaciones from './operaciones/operaciones.module';

const Components = angular
    .module('app.components', [
        Admin,
        Listados,
        Operaciones
    ])
    .name;

export default Components;