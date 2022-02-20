'use strict';

import MdInputComponent from './md-input/md-input.component';
import MdTextareaComponent from './md-input/md-textarea.component';
import MdSelectComponent from './md-input/md-select.component';
import MdEventLabel from './md-input/md-event-label.directive';

const MaterialModule = angular
    .module('app.material', [])
    .component('mdInput', MdInputComponent)
    .component('mdTextarea', MdTextareaComponent)
    .component('mdSelect', MdSelectComponent)
    .directive('mdEventLabel', () => new MdEventLabel())
    .name;

export default MaterialModule;