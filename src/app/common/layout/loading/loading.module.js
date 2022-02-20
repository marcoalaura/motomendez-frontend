'use strict';

import LoadingComponent from './loading.component';
import LoadingService from './loading.service';

const Loading = angular
    .module('app.loading', [])
    .component('appLoading', LoadingComponent)
    .service('Loading', LoadingService)
    .name;

export default Loading;