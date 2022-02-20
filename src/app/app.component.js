'use strict';

import controller from './app.controller';

const AppComponent = {
  controller,
  template: `
    <app-sidenav ng-if="$root.auth" id="app-sidenav" ng-class="{ 'no-sidenav' : !$ctrl.getSidenav() }"></app-sidenav>
    <app-navbar ng-if="$root.auth"></app-navbar>
    <div class="main" ng-class="{ 'no-login' : !$root.auth }">
      <app-breadcrumb ng-if="$root.auth"></app-breadcrumb>
      <section class="main-section" ui-view></section>
    </div>
    <app-footer></app-footer>
    <app-loading></app-loading>
  `
};

export default AppComponent;
