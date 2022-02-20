'use strict';

import angular from 'angular';

// Importando componentes base
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import Config from './app.config';

const root = angular
.module('app', [
    Config,
    Common,
    Components,
    ])
  .component('app', AppComponent)
  .constant()
  .name;

// Bootstrap the app.
document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['app']));

export default root;