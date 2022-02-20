'use strict';

import Help from './help.component';
import HelpPopup from './help-popup.service';
import Tourhelp from './tour-help/tour-help.module';
import './help.scss';

const HelpModule = angular
    .module('angular-help', [
        Tourhelp
    ])
    .directive('idHelp', ['Util', function(Util) {
        return {
            link: function(scope, element/*, attrs*/) {
                var id = 'ui-help-' + Util.id();
                element[0].setAttribute('id', id);
                scope.$ctrl.idHelp = id;
            }
        };
    }])
    .service('HelpPopup', HelpPopup)
    .component('uiHelp', Help)
    .name;

export default HelpModule;
