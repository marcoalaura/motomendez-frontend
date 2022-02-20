'use strict';

class MessageService {

    constructor(toastr, $log) {
        "ngInject";

        this.toastr = toastr;
        this.$log = $log;
    }

    success(msg, title, timeout, callback) {
        var data = {
            message : msg || 'La operación se realizó correctamente.',
            title : title || 'Correcto',
            type : 'success',
            timeout: timeout,
            callback: callback
        };

        this._render(data);
    }

    info(msg, title, timeout, callback) {
        var data = {
        
            message : msg || 'Revise la documentación.',
            title : title || 'Información',
            type : 'info',
            timeout: timeout,
            callback: callback
        };

        this._render(data);
    }

    error(msg, title, timeout, callback) {
        var data = {
            message : msg || 'Ocurrió un error al procesar su operación.',
            title : title || 'Error',
            type : 'error',
            timeout: timeout,
            callback: callback
        };

        this._render(data);
    }

    warning(msg, title, timeout, callback) {
        var data = {
            message : msg || 'Ocurrió algo inesperado al procesar su operación.',
            title : title || 'Advertencia',
            type : 'warning',
            timeout: timeout,
            callback: callback
        };

        this._render(data);
    }

    _render(data) {
        this.toastr[data.type](data.message, data.title);
    }
}

export default MessageService;