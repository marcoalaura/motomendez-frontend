'use strict';

import Services from './services/service.module';
import Filter from './filters/filter.module';
import Interceptor from './interceptors/interceptor.module';
import Vendor from './vendor/vendor.module.js';
import Util from './util/util.module';

const Core = angular
    .module('app.core', [
        Vendor,
        Interceptor,
        Filter,
        Services,
        Util
    ])
    .name;

export default Core;