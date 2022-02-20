'use strict';

import WavesDirective from './waves.directive';
import './waves.css';

const Waves = angular
    .module('vendor.waves', [])
    .directive('mdEffect', () => new WavesDirective())
    .name;

export default Waves;