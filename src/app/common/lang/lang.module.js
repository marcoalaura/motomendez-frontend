'use strict';

import Errors from './es/errors.lang';
import Help from './es/help.lang';

const Lang = angular
    .module('app.lang', [])
    .constant('errorsLang', Errors)
    .constant('helpLang', Help)
    .run(($rootScope, errorsLang, helpLang) => {
        "ngInject";

        $rootScope.lang = {
            errorsLang,
            helpLang   
        };
    })
    .name;

export default Lang;