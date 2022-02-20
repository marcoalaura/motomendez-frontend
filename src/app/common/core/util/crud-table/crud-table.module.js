'use strict';

import CrudTableComponent from './crud-table.component';
import CrudTableService from './crud-table.service';
import './crud-table.scss';

const CrudTableModule = angular
    .module('app.crud-table', [])
    .service('CrudTable', CrudTableService)
    .component('crudTable', CrudTableComponent)
    .name;

export default CrudTableModule;