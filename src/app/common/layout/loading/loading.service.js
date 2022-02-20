'use strict';

class LoadingService {
    constructor(cfpLoadingBar) {
        'ngInject';

        this.cfpLoadingBar = cfpLoadingBar;
    }

    show(message, locked) {
        this.cfpLoadingBar.start();
        document.querySelector('#loading-bar-spinner .loading-text').innerHTML = message || 'Cargando';

        if (locked) {
            document.querySelector('#loading-bar-spinner').classList.add('screen-locked');
        } else {
            document.querySelector('#loading-bar-spinner').classList.remove('screen-locked');
        }
    }

    hide() {
        this.cfpLoadingBar.complete();
        document.querySelector('#loading-bar-spinner .loading-text').innerHTML = 'Cargando';
        document.querySelector('#loading-bar-spinner').classList.remove('screen-locked');
    }
}

export default LoadingService;