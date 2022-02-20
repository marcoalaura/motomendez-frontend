'use strict';

class TourHelpController {
    constructor($scope, $rootScope, $window, $document, HelpPopup) {
        'ngInject';

        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.$document = $document;
        this.HelpPopup = HelpPopup;
    }

    $onInit() {
        this.$element = null;
        this.position = 0;

        this.tmplFinish = '<button class="btn btn-primary" ng-click="$ctrl.finish()"><i class="fa fa-check-circle"></i> ' + (this.tourLabel && this.tourLabel.end ? this.tourLabel.end : 'Terminar') + '</button>';

        if (this.tour && this.tour.length) {
            this.step();
        }
    }

    renderButton(setting) {
        return [
            '<button type="button" class="btn ' + (setting.className || '') + '" ng-click="' + (setting.onClick || '') + '">',
                setting.icon && setting.icon.length ? `<i class="fa fa-${setting.icon}"></i>` : '',
                setting.label,
            '</button>'
        ].join(' ');
    }

    step() {
        let buttons = '<div class="tour-help-buttons">';
        if (this.position > 0 && (this.tour[this.position].btnPrev === undefined || this.tour[this.position].btnPrev)) {
            buttons += this.renderButton({
                label: this.tour[this.position].labelPrev || 'Anterior',
                icon: this.tour[this.position].iconPrev || 'angle-double-left',
                className: this.tour[this.position].classPrev || '',
                onClick: '$ctrl.prev()'
            });
        }
        if (this.position < this.tour.length - 1 && (this.tour[this.position].btnNext === undefined || this.tour[this.position].btnNext)) {
            buttons += this.renderButton({
                label: this.tour[this.position].labelNext || 'Siguiente',
                icon: this.tour[this.position].iconNext || 'angle-double-right',
                className: this.tour[this.position].classNext || '',
                onClick: '$ctrl.next()'
            });
        }
        if (this.tour[this.position].btnFinish === undefined || this.tour[this.position].btnFinish) {
            buttons += this.tmplFinish;
        }
        buttons += '</div>';
        this.$element = this.HelpPopup.render(this.$scope, this.tour[this.position].title, this.tour[this.position].text + buttons, this.tour[this.position].id, this.tour[this.position].position || 'bottom', 'tour-popup', this.tour[this.position].width, true);
        if (this.$element) {
            this.drawBackdrop(this.tour[this.position].id, this.$element);
        }
    }

    next() {
        if (typeof this.tour[this.position].next == 'function') {
            this.tour[this.position].next();
        }
        this.position++;
        setTimeout(() => {
            this.step();
        }, this.tour[this.position].sleepShow || 0);        
    }

    prev() {
        if (typeof this.tour[this.position].prev == 'function') {
            this.tour[this.position].prev();
        }
        this.position--;
        setTimeout(() => {
            this.step();
        }, this.tour[this.position].sleepPrev || 0);
    }

    finish() {
        if (typeof this.tourEnd == 'function') {
            this.tourEnd();
        }
        this.HelpPopup.destroy(this.$element, true);
        this.destroyBackdrop();
    }

    destroyBackdrop() {
        angular.element(document.querySelectorAll('.tour-help-backdrop')).remove();
    }

    drawBackdrop(id, $help) {
        
        this.destroyBackdrop();

        if (id) {                
            let pos = this.getPosition(id, $help);

            this.createDiv(pos.top, 'top');
            this.createDiv(pos.right, 'right');
            this.createDiv(pos.bottom, 'bottom');
            this.createDiv(pos.left, 'left');
            this.createDiv({
                top: this.transform(pos.elem.top - pos.body.top),
                left: this.transform(pos.elem.left),
                height: this.transform(pos.elem.height),
                width: this.transform(pos.elem.width)
            }, 'tour-transparent');
            
            window.addEventListener('resize', () => {
                let pos = this.getPosition(id, $help);
                if (pos) {
                    this.changePosition(pos.top, 'top');
                    this.changePosition(pos.right, 'right');
                    this.changePosition(pos.bottom, 'bottom');
                    this.changePosition(pos.left, 'left');
                    this.changePosition({
                        top: this.transform(pos.elem.top - pos.body.top),
                        left: this.transform(pos.elem.left),
                        height: this.transform(pos.elem.height),
                        width: this.transform(pos.elem.width)
                    }, 'tour-transparent');
                }
            });
        } else {
            let body = document.body.getBoundingClientRect();
            this.createDiv({
                top: 0,
                left: 0,
                height: this.transform(body.height),
                width: this.transform(body.width)
            }, 'tour-transparent-center');

            window.addEventListener('resize', () => {
                let body = document.body.getBoundingClientRect();
                this.changePosition({
                    top: 0,
                    left: 0,
                    height: this.transform(body.height),
                    width: this.transform(body.width)
                }, 'tour-transparent-center');                    
            });
        }
    }

    getPosition(id, $help) {
        let body = document.body.getBoundingClientRect();
        let elem = null;
        if (typeof id == 'string' && id.length) {
            elem = document.querySelector('#' + id);
            if (elem) {
                elem = elem.getBoundingClientRect();
            } else {
                return false;
            }
        } else {
            elem = id.getBoundingClientRect();
        }

        let position = {
            elem: elem,
            body: body
        };

        position.top = {
            top: 0,
            left: 0,
            height: this.transform(elem.top - body.top),
            width: this.transform(body.width)
        };
        position.right = {
            top: this.transform(elem.top - body.top),
            left: this.transform(elem.right),
            height: this.transform(elem.height),
            width: this.transform(body.width - elem.right)
        };
        position.bottom = {
            top: this.transform((elem.top + elem.height) - body.top),
            left: this.transform(0),
            height: this.transform(body.height - (elem.top + elem.height - body.top)),
            width: this.transform(body.width)
        };
        position.left = {
            top: this.transform(elem.top - body.top),
            left: this.transform(0),
            height: this.transform(elem.height),
            width: this.transform(elem.left)
        };

        if (elem.top + elem.height > body.height) {
            let scrollY = elem.top + elem.height - body.height;
            $help.css('top', parseInt($help.css('top')) - (scrollY + 30));
            window.scrollTo(0, scrollY  + 30 - body.top);
            // bottom.height = this.transform(30);
        }

        return position;
    }

    transform(number) {
        return parseFloat(number).toFixed(2) + "px";
    }

    changePosition(css, className) {
        this.setCss(document.querySelector('.tour-help-backdrop.' + className), css);
    }

    createDiv(css, className) {
        let div = document.createElement('div');
        div.className = "tour-help-backdrop";
        if (className) {
            div.classList.add(className);
        }
        this.setCss(div, css);
        document.body.appendChild(div);
    }

    setCss(obj, data) {
        if (obj) {                
            for (let i in data) {
                obj.style[i] = data[i];
            }
        }
    }
}

export default TourHelpController;