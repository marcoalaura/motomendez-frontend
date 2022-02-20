'use strict';

class StorageService {

    constructor($window, appName) {
        'ngInject';

        this.appName = appName || 'app';
        this.$local = $window.localStorage;
        this.$session = $window.sessionStorage;
        this.$JSON = $window.JSON;
    }

    setUser(user) {
        this.set('user', user);
    }

    getUser() {
        return this.get('user');
    }

    existUser() {
        return this.exist('user');
    }

    removeUser() {
        this.removeSession('user');
    }

    // LocalStorage
    set(key, value) {
        this.$local.setItem(this.appName + '_' + key, this.$JSON.stringify(value));
    }

    get(key) {
        let data = this.$local.getItem(this.appName + '_' + key);
        try {
            return this.$JSON.parse(data);
        } catch (Exception) {
            return data;
        }
    }

    remove(key) {
        this.$local.removeItem(this.appName + '_' + key);
    }

    destroy(key) {
        this.remove(key);
    }

    exist(key) {
        var value = this.$local.getItem(this.appName + '_' + key);
        return typeof value != 'undefined' && value != 'undefined' && value != null && value != 'null' && value != '[]';
    }

    // SessionStorage
    setSession(key, value) {
        this.$session.setItem(this.appName + '_' + key, this.$JSON.stringify(value));
    }

    getSession(key) {
        return this.$JSON.parse(this.$session.getItem(this.appName + '_' + key));
    }

    removeSession(key) {
        this.$session.removeItem(this.appName + '_' + key);
    }

    existSession(key) {
        var value = this.$session.getItem(this.appName + '_' + key);
        return typeof value != 'undefined' && value != 'undefined' && value !== null && value != 'null' && value != '[]';
    }

    // Flash Data
    getFlash(key) {
        if (this.exist(key)) {
            var value = this.get(key);
            this.remove(key);
            return value;
        }
        return false;
    }

    flash(key) {
        this.getFlash(key);
    }

}

export default StorageService;
