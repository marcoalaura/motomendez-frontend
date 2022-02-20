'use strict';

import Datetime from './datetime.filter';
import Text from './text.filter';

const Filter = angular
    .module('app.filters', [])
    .filter('datetime', Datetime)
    .filter('characters', Text.characters)
    .filter('splitcharacters', Text.splitcharacters)
    .filter('words', Text.words)
    .name;

export default Filter;