'use strict';

import HTTPCanceler from './http-canceler.service';
import DataService from './data.service';
import Config from './data.config';

const Data = angular
    .module('app.data', [])
    .constant('DataServiceConfig', {
        filterResponse: null
    })
    .service('HTTPCanceler', HTTPCanceler)
    .service('DataService', DataService)
    .config(Config)
    .name;

export default Data;