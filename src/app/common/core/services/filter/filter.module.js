'use strict';

import FilterService from './filter.service';

import './filter.scss';

function paste(obj, e) {
    e.stopPropagation();
    e.preventDefault();

    let pastedData;
    if (window.clipboardData && window.clipboardData.getData) { // IE       
        pastedData = window.clipboardData.getData('Text');
    } else if (e.clipboardData && e.clipboardData.getData) {
        pastedData = e.clipboardData.getData('text/plain');
    }

    if (typeof pastedData == 'string' && pastedData.length) {
        pastedData = pastedData.trim();
    }

    if (obj.maxLength !== undefined) {        
        let maxLength = parseInt(obj.maxLength);
        if (maxLength && maxLength > 0 && typeof maxLength == 'number') {
            pastedData = pastedData.substring(0, maxLength);
        }
    }

    return pastedData;
}

function setTextPaste(scope, ngModel, text) {
    ngModel = ngModel.replace('$ctrl.', '');
    let model = ngModel.split('.');
    if (model.length > 1) {
        if (model.length == 2) {
            scope.$ctrl[model[0]][model[1]] = text;
        } else if (model.length == 3) {
            scope.$ctrl[model[0]][model[1]][model[2]] = text;
        } else if (model.length == 4) {
            scope.$ctrl[model[0]][model[1]][model[2]][model[3]] = text;
        }
    } else {
        scope.$ctrl[ngModel] = text;
    }
}

const Filter = angular
    .module('app.service.filter', [])
    .service('Filter', FilterService)
    .directive('integer', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.integer(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isInteger(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isInteger(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('decimal', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.decimal(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isDecimal(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isDecimal(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('decimalPositive', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.decimalPositive(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isDecimalPositive(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isDecimalPositive(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('decimalFormat', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.decimalFormat(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isDecimalFormat(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isDecimalFormat(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('numeric', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.numeric(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isNumeric(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isNumeric(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('alpha', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.alpha(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isAlpha(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isAlpha(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('alphaNumeric', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.alphaNumeric(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isAlphaNumeric(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isAlphaNumeric(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('alphaDash', Filter => {  
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.alphaDash(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isAlphaDash(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isAlphaDash(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('passport', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.passport(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isPassport(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isPassport(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('phone', Filter => {
        return (scope, element, attr) => {
            element.bind("keydown", e => {
                Filter.phone(e);
            }).bind('paste', e => {
                if (attr.trimPaste !== undefined) {
                    let text = paste(element[0], e);
                    scope.$apply(function() {
                        text = Filter.isPhone(text) ? text : '';
                        setTextPaste(scope, attr.ngModel, text);
                    });
                } else {
                    setTimeout(() => {
                        if (!Filter.isPhone(element[0].value)) {
                            element[0].value = '';
                        }
                    }, 1);
                }
            });
        };
    })
    .directive('uppercase', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                ctrl.$parsers.push(function(input) {
                    return input ? input.toUpperCase() : "";
                });
                element.css("text-transform","uppercase");
            }
        };
    })
    .directive('nit', Filter => {
        let $error = angular.element('<div class="md-error-nit">NIT inválido</div>');

        return (scope, element) => {
            element.bind("keydown", e => {
                Filter.numeric(e);
            }).bind("keyup", () => {
                let isNit = Filter.isNit(element[0].value);
                let $element = angular.element(element[0]).parent();
                if (!isNit) {
                    $element.append($error);
                    $element.addClass('relative');
                } else {
                    $error.remove();
                    $element.removeClass('relative');
                }
            }).bind('paste', () => {
                setTimeout(() => {
                    if (!Filter.isNit(element[0].value)) {
                        element[0].value = '';
                    }
                }, 1);
            });
        };
    })
    .directive('focusMe', ['$timeout', $timeout => {
        return {
            scope: { trigger: '@focusMe' },
            link: (scope, element) => {
                scope.$watch('trigger', value => {
                    if(value === "true") {
                        $timeout(() => {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }])
    .directive('focusIf', ['$timeout', $timeout => {
        function link($scope, $element, $attrs) {
            var dom = $element[0];
            if ($attrs.focusIf) {
                $scope.$watch($attrs.focusIf, focus);
            } else {
                focus(true);
            }
            function focus(condition) {
                if (condition) {
                    $timeout(function() {
                        dom.focus();
                    }, $scope.$eval($attrs.focusDelay) || 0);
                }
            }
        }
        return {
            restrict: 'A',
            link: link
        };
    }])
    .name;

export default Filter;
