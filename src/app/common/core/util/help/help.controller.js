'use strict';

class HelpComponent {
    constructor($scope, $rootScope, HelpPopup) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.HelpPopup = HelpPopup;
        this.$scope = $scope;
    }

    $onInit() {

        this.$element = null;

        this.idHelp = null;

        this.$rootScope.$on('$stateChangeStart', function(/*event, toState, toParams, fromState, fromParams*/) {
            if (this.$element) {
                this.$element.remove();
            }
        });
    }

    hoverIn() {
        this.$element = this.HelpPopup.render(this.$scope, this.title, this.message, this.idHelp, this.position || this.direction);
    }

    hoverOut () {
        this.HelpPopup.destroy(this.$element);
    }
}

export default HelpComponent;