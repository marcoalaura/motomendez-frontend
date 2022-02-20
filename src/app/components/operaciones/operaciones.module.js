'use strict';

import CorteAnual from './corteAnual/corteAnual.module';
import OperacionesCorte from './corteAnual/operacionesCorte.module';
import CorteMensual from './corteMensual/corteMensual.module';
import OperacionesCorteMensual from './corteMensual/operacionesCorteMensual.module';

const Operaciones = angular
    .module('app.operaciones', [
        CorteAnual,
        CorteMensual,
        OperacionesCorte,
        OperacionesCorteMensual
    ])
    .name;

export default Operaciones;