/**
 * No se puede definir factories con las clases de EcmaScript 6, por lo cual se deben
 * utilizar services para definir estos factories(factory), si se quieren factories 
 * se deben codificar de la manera tradicional con la estructura:
 * function () { return {} };
 */

'use strict';

import Filter from './filter/filter.module';
import Data from './data/data.module';

import Storage from './storage/storage.service';
import Util from './util/util.service';
import numToWord from './util/numeroaLetras.service';
import ArrayUtil from './array/array.service';
import Datetime from './datetime/datetime.service';
import Message from './message/message.module';
import Modal from './modal/modal.module';

const Core = angular
    .module('app.services', [ 
        Filter,
        Data,
        Message,
        Modal
    ])
    .service('numToWord', numToWord)
    .service('Util', Util)
    .service('Storage', Storage)
    .service('ArrayUtil', ArrayUtil)
    .service('Datetime', Datetime)
    .name;

export default Core;