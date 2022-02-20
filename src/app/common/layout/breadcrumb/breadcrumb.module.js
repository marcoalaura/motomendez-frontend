'use strict';

import BreadcrumbComponent from './breadcrumb.component';
import BreadcrumbFactory from './breadcrumb.factory';

const Breadcrumb = angular
    .module('app.breadcrumb', [])
    .factory('BreadcrumbFactory', BreadcrumbFactory)
    .component('appBreadcrumb', BreadcrumbComponent)
    .name;

export default Breadcrumb;