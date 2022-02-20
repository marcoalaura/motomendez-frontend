'use strict';

import controller from './help.controller';

const help = {
    bindings: {
        message: '<',
        title: '<',
        position: '@',
        direction: '@',
        idHelp: '@'
    },
    template: `
        <span class="ui-help" ng-if="$ctrl.message" id-help ng-mouseover="$ctrl.hoverIn()" ng-mouseleave="$ctrl.hoverOut()">
            <i class="fa fa-question-circle"></i>
        </span>
    `,
    controller,
};

export default help;