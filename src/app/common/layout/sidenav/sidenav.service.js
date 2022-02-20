'use strict';

class SidenavService {
    constructor($location, Filter) {
        'ngInject';

        this.$location = $location;
        this.Filter = Filter;
    }

    $onInit() {

    }

    path(url) {
        this.$location.path(url);

        setTimeout(() => {
            let origin = null;
            let el = document.querySelector('#sidenav-menu .sidenav-submenu-item.active');
            if (el) {
                el.classList.remove('active');
                origin = el.parentNode.parentNode.previousElementSibling.getAttribute('data-url');
            }

            if (!this.Filter.empty(url)) {              
                el = document.querySelector(`#sidenav-menu .sidenav-submenu-item[data-url=${url}]`);
                if (el) {
                    el.classList.add('active');
                    el = el.parentNode.parentNode.previousElementSibling;
                    if (el.getAttribute('data-url') != origin) {
                        el.dispatchEvent(new window.Event('click'));
                    }
                }
            }
        }, 100);
    }
}

export default SidenavService;