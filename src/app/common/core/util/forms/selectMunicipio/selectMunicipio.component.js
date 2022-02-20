'use strict';

import controller from './selectMunicipio.controller';
import template from './selectMunicipio.html';
import './selectMunicipio.scss';

const selectMunicipioComponent = {
    bindings: {
        departamento: '=',
        provincia: '=',
        municipio: '=',
        conf: '<'
    },
    controller,
    template
};

export default selectMunicipioComponent;
