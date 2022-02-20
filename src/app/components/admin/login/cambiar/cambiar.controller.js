'use strict';

class CambiarController {

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
        
    }

    cambiarContrasena() {

        if (this.passwordNew.length >= 8 ) {
        if (this.passwordNew === this.repeatPassword){  
            this.DataService.post('usuarios/contrasena', {
            contrasena: this.passwordOld,
            contrasena_nueva: this.passwordNew
            })
            .then(respuesta => {
                if (respuesta && respuesta.finalizado) {
                    this.$location.path("/" + this.Storage.getUser().pathInicio);
                    this.Message.success('Su contraseña fue correctamente cambiada.');
                } else {
                    if(!respuesta){
                        throw new Error('No se pudo cambiar la contraseña.');
                    }
                }
                
            })
            .catch((err) =>{
                this.$log.log(err);
            });
        } else {
            this.Message.error('Vuelva a escribir su contraseña, recuerde que debe escribir exactamente lo mismo en el siguiente campo.');
        }
        } else{
        this.Message.error('La nueva contraseña debe contener al menos 8 carateres.');
        }  
    }

    cancel() {
        this.$location.path("/" + this.Storage.getUser().pathInicio);
    }
}

export default CambiarController;