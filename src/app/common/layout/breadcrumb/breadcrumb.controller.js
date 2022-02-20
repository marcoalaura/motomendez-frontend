'use strict';

class BreadcrumbController {
    constructor(Storage, $location, BreadcrumbFactory, Util) {
        'ngInject';

        this.Storage = Storage;
        this.$location = $location;
        this.BreadcrumbFactory = BreadcrumbFactory;
        this.Util = Util;
    }

    $onInit() {
        if (this.Storage.exist('menu')) {
            var page = this.Util.getMenuOption(this.Storage.get('menu'), this.$location.path().replace('/', ''));
            this.BreadcrumbFactory.setParent(page[0]);
            this.BreadcrumbFactory.setCurrent(page[1]);
        }
    }

    getParent() {
        return this.BreadcrumbFactory.getParent();
    }

    getCurrent() {
        return this.BreadcrumbFactory.getCurrent();
    }
}

export default BreadcrumbController;