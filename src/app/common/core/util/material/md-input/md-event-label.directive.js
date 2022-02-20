'use strict';

class MdEventLabel {
    constructor() {
        this.restrict = 'A';
    }

    link($scope, $elem) {
        if ($scope.$ctrl.required === undefined || $scope.$ctrl.ngRequired === undefined) {
            let $input = $elem.find('input');
            if ($input.length === 0) {
                $input = $elem.find('textarea');
            }
            if ($input.length) {
                $input.addClass('not-required');
                $input.on('focus', () => {
                    $input.removeClass('not-required');
                }).on('blur', () => {
                    $input[$input.val().length ? 'removeClass' : 'addClass']('not-required');
                });
            } else {
                setTimeout(() => {
                    $input = $elem.find('input');
                    $input.on('focus', () => {
                        $input.parent().addClass('not-required-select').parent().addClass('md-focus');
                    }).on('blur', () => {
                      if (!$input.parent().hasClass('open')) {
                        setTimeout(() => {
                            $input.parent()[$input.parent()[0].querySelector('.ui-select-match-text').innerHTML.length ? 'addClass' : 'removeClass']('not-required-select').parent().removeClass('md-focus');
                        }, 1);
                      }
                    });
                }, 1000);
            }
        }
    }
}

export default MdEventLabel;
