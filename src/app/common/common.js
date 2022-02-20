'use strict';

// Importando css de las librerías del sistema
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/angular-loading-bar/build/loading-bar.css';
import '../../../node_modules/angular-toastr/dist/angular-toastr.min.css';
import '../../../node_modules/ui-select/dist/select.min.css';
import '../../../node_modules/leaflet/dist/leaflet.css';
import './core/vendor/ng-table/ng-table.css';
import './styles/sass/index.scss';
import './styles/postcss/index.css';

// Importando dependencias
import uiRouter from '@uirouter/angularjs';
import satellizer from 'satellizer';
import loadingBar from 'angular-loading-bar';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import uiSelect from 'ui-select';
import toastr from 'angular-toastr';

//import MatExpansionModule from '@angular/material';
//import NgbModule from '@ng-bootstrap/ng-bootstrap';
// import 'tether'; // Tether (required for Bootstrap 4.x)
import '../../../node_modules/angular-formly/dist/formly';
import '../../../node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap';
//import '../../../node_modules/angular-file-upload/dist/angular-file-upload';
import '../../../node_modules/leaflet/dist/leaflet';
import '../../../node_modules/angular-leaflet-directive/dist/angular-leaflet-directive';
import '../../../node_modules/ng-file-model';
import './core/vendor/ng-table/ng-table';
import '../../../node_modules/angucomplete-alt/dist/angucomplete-alt.min';

import Config from './common.config';
import Run from './common.run';
import Lang from './lang/lang.module';
import Core from './core/core.module';
import Layout from './layout/layout.module';

const Common = angular
  .module('app.common', [
    loadingBar,
    ngSanitize,
    ngMessages,
    ngResource,
    satellizer,
    'angucomplete-alt',
    //'angularFileUpload',
    'formlyBootstrap',
    toastr,
    'ngTable',
    'ng-file-model',
    uiRouter,
    uiSelect,
    //NgbModule,
    Lang,
    Core,
    Layout,
    'cfp.loadingBar'
  ])
  .config(Config)
  .run(Run)    
  .constant('statePrevs', {}) // Controlar state(url) previos para cada state, si no se define en un state trabajara normal
  .name;

export default Common;