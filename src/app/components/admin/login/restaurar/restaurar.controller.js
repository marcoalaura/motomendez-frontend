'use strict';

import modalController from './restaurar.modal.controller.js';
import modalTemplate from './restaurar.modal.html';

class RestaurarController {

    constructor($rootScope, Storage, Message, timeSessionExpired, Auth, $log, $location, Modal, DataService, Datetime) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.Storage = Storage;
        this.Message = Message;
        this.Auth = Auth;
        this.timeSessionExpired = timeSessionExpired;
        this.$log = $log;
        this.$location = $location;
        this.Modal = Modal;
        this.DataService = DataService;
        this.Datetime = Datetime;
    }

    $onInit() {
        this.email = null;
      }

    openModal(size = '') {
        this.Modal.show({
            template: modalTemplate,
            controller: modalController,
            data: this.email,
            size,
        });
    }
    solicitaCodigo() {
        this.DataService._baseUrl('POST','contrasena/verificar_correo', {
            email: this.correo
        })
        .then(respuesta => {
            if (respuesta && respuesta.finalizado) {
                this.email = this.correo;
                this.openModal('lg');
            } else {
                if (!respuesta){
                  throw new Error('No se ha podido verificar la existencia del email para restaurar la contraseña.');
                }              
            }
            
        })
        .catch((err) =>{
            this.$log.log(err);
        });
      
    }

    goLogin() {
        this.$location.path('logout');
    }
}

export default RestaurarController;