'use strict';

import TourHelp from './tour-help.component';
import './tour-help.css';

const TourHelpModule = angular
    .module('angular-tour-help', [])
    .component('uiTourHelp', TourHelp)
    .name;

export default TourHelpModule;
