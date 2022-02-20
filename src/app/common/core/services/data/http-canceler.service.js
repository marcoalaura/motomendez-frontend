'use strict';

class HTTPCanceler {
    
    constructor($q) {
        'ngInject';

        this.$q = $q;
        this.promisesToReject = {};
        this.canceler = {};
        this.inited = {};
    }

    get(defer, namespace) {
        namespace = namespace || 'default';
        if (!this.promisesToReject[namespace]) {
            this.promisesToReject[namespace] = [];
            this.canceler[namespace] = null;
            this.inited[namespace] = false;
        }
        if (defer){
            this.promisesToReject[namespace].push(defer);
        }
        //Create new defer in first time and when the promise was canceled before
        if(!this.inited[namespace]){
            this.canceler[namespace] = this.$q.defer();
            this.inited[namespace]   = true;
        }
        return this.canceler[namespace];
    }

    cancel(namespace) {
        namespace = namespace || 'default';
        angular.forEach(this.promisesToReject, function(promises, promiseNamespace) {
            if (!this.canceler[promiseNamespace]) return;
            if ('default'!==namespace && namespace!=promiseNamespace) return;
            this.canceler[promiseNamespace].resolve();
            this.inited[promiseNamespace] = false;
            // Reject namespace promises
            angular.forEach(promises, function(defer) {
                defer.reject();
            });
            this.promisesToReject[promiseNamespace] = [];
        });
    }

}

export default HTTPCanceler;