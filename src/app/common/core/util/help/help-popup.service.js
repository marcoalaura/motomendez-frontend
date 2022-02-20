'use strict';

class HelpService {
    constructor($window, $document, $compile) {
        'ngInject';

        this.$window = $window;
        this.$document = $document;
        this.$compile = $compile;

        this.template = `
            <div class="ui-help-content">
                <div class="ui-help-header">
                    <i class="fa fa-question-circle"></i> <span class="ui-help-title"></span>
                    <hr>
                </div>
                <div class="ui-help-body"><span class="ui-help-message"></span></div>
            </div>`;
        
        this.fadeSleep = 500;
    }

    $onInit() {        
    }

    renderSleep(el) {
        setTimeout(function () {
            el.remove(); 
        }, this.fadeSleep);
    }

    fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                window.requestAnimationFrame(fade);
            }
        })();
    }

    fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            let val = parseFloat(el.style.opacity);

            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                window.requestAnimationFrame(fade);
            }
        })();
    }

    render($scope, title, message, idHelp, positionIn, classNew, width, fade) {
        if (fade) {
            let helps = document.querySelectorAll('.ui-help-content');
            if (helps.length) {
                for (let i in helps) {
                    if (helps[i].classList) {
                        this.fadeOut(helps[i]);
                        this.renderSleep(helps[i]);
                    }
                }
            }
        } else {
            angular.element(document.querySelectorAll('.ui-help-content')).remove();
        }
        let element = angular.element(this.template)[0];
        if (classNew) {
            element.classList.add(classNew);
        }
        angular.element(document.body).append(element);
        if (fade) {
            element.classList.add('fade');
            this.fadeIn(element);
        }

        if (typeof title != 'boolean') {
            element.querySelector('.ui-help-title').innerHTML = title || 'Ayuda';
        }
        let content = this.$compile('<div>' + (message || 'Texto de ayuda') + '</div>')($scope);
        angular.element(element.querySelector('.ui-help-message')).append(content);
        let height = element.clientHeight;
        if (width) {
            element.style.width = `${width}px`;
        } else {
            width = element.clientWidth;
        }

        if (idHelp === undefined || idHelp === null) {
            element.classList.add('ui-help-center');
            element.style.marginTop = -1 * (height / 2) - 20 + 'px';
            element.style.marginLeft = -1 * (width / 2) + 'px';
        } else {
            
            this.renderPosition(element, idHelp, positionIn, height, width);

            window.addEventListener('resize', () => {
                this.renderPosition(element, idHelp, positionIn, height, width);
            });
        }

        return element;
    }

    renderPosition(element, idHelp, positionIn, height, width) {
        let position = null;
        if (typeof idHelp == 'string') {
            let elem = document.getElementById(idHelp);
            if (elem) {
                position = elem.getBoundingClientRect();
            } else {
                return false;
            }
        } else {
            position = idHelp.getBoundingClientRect();
        }
        let heightWindow = this.$window.innerHeight;
        let widthWindow = this.$window.innerWidth;
        let posInitial = position;
        let className = '';
        let direction = positionIn || 'right';

        if (direction == 'top') {
            position = this.top(posInitial, height, width);
            if (position.top < 0) {
                direction = 'bottom';
            }
        }
        if (direction == 'right') {
            position = this.right(posInitial, height);
            if (position.left + width > widthWindow) {
                direction = 'left';
            }
        }
        if (direction == 'bottom') {
            position = this.bottom(posInitial, width);
            if (position.top + height > heightWindow) {
                direction = 'top';
                position = this.top(posInitial, height, width);
            }
        }
        if (direction == 'left') {
            position = this.left(posInitial, height, width);
            if (position.left < 0) {
                direction = 'right';
                position = this.right(posInitial, height);
            }
        }

        className = direction;

        if (direction == 'top') {
            if (position.left + width > widthWindow) {
                position = this.top_left(posInitial, height, width);
                className = 'top-left';
            } else {
                if (position.left < 0) {
                    position = this.top_right(posInitial, height, width);
                    className = 'top-right';
                }
            }
        }

        if (direction == 'right') {
            if (position.top + height > heightWindow) {
                position = this.right_top(posInitial, height);
                className = 'right-top';
            } else {
                if (position.top < 0) {
                    position = this.right_bottom(posInitial, width);
                    className = 'right-bottom';
                }
            }
        }

        if (direction == 'bottom') {
            if (position.left + width > widthWindow) {
                position = this.bottom_left(posInitial, width);
                className = 'bottom-left';
            } else {
                if (position.left < 0) {
                    position = this.bottom_right(posInitial);
                    className = 'bottom-right';
                }
            }
        }

        if (direction == 'left') {
            if (position.top + height > heightWindow) {
                position = this.left_top(posInitial, height, width);
                className = 'left-top';
            } else {
                if (position.top < 0) {
                    position = this.left_bottom(posInitial, width);
                    className = 'left-bottom';
                }
            }
        }

        // console.log('H:', height, 'W:', width, 'HW', heightWindow, 'WW', widthWindow);
        // console.log('INITIAL:', posInitial, 'END:', position, 'POSITION', className, 'ELEMENT', element);

        element.classList.remove('top');
        element.classList.remove('right');
        element.classList.remove('bottom');
        element.classList.remove('left');
        element.classList.remove('top-left');
        element.classList.remove('top-right');
        element.classList.remove('right-top');
        element.classList.remove('right-bottom');
        element.classList.remove('bottom-left');
        element.classList.remove('bottom-right');
        element.classList.remove('left-top');
        element.classList.remove('left-bottom');
        element.classList.add(className);
        element.style.top = `${position.top}px`;
        element.style.left = `${position.left}px`;
    }

    destroy(element, fade) {
        if (element) {
            if (fade) {
                this.fadeOut(element);
                setTimeout(function () {
                    element.remove();    
                }, this.fadeSleep);
            } else {
                element.remove();
            }
        }
    }

    top (position, height, width) {
        return {
            top: position.top - height - 12,
            left: position.left - (width/2 - position.width/2)
        };
    }

    top_right (position, height) {
        return {
            top: position.top - height - 12,
            left: position.left + position.width/2 - 20
        };
    }

    top_left (position, height, width) {
        return {
            top: position.top - height - 12,
            left: (position.left + position.width/2 + 20) - width
        };
    }

    right (position, height) {
        return {
            top: position.top - (height/2 - position.height/2),
            left: position.left + position.width + 12
        };
    }

    right_top (position, height) {
        return {
            top: position.top + position.height/2 - height + 20,
            left: position.left + position.width + 12
        };
    }

    right_bottom (position) {
        return {
            top: position.top + position.height/2 - 20,
            left: position.left + position.width + 12
        };
    }        

    bottom (position, width) {
        return {
            top: position.top + position.height + 12,
            left: position.left - (width/2 - position.width/2)
        };
    }

    bottom_right (position) {
        return {
            top: position.top + position.height + 12,
            left: position.left + position.width/2 - 20
        };
    }

    bottom_left (position, width) {
        return {
            top: position.top + position.height + 12,
            left: (position.left + position.width/2 + 20) - width
        };
    }

    left (position, height, width) {
        return {
            top: position.top - (height/2 - position.height/2),
            left: position.left - width - 12
        };
    }

    left_top (position, height, width) {
        return {
            top: position.top + position.height/2 - height + 20,
            left: position.left - width - 12
        };
    }

    left_bottom (position, width) {
        return {
            top: position.top + position.height/2 - 20,
            left: position.left - width - 12
        };
    }
}

export default HelpService;