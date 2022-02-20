'use strict';

class RestaurarModalController {
    constructor($uibModalInstance, data, Message, DataService, $location, $log) {
        'ngInject';
        this.Message = Message;
        this.DataService = DataService;
        this.email = data;
        this.$location = $location;
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {
        // this.selected es un dato de ejemplo
    }

    goLogin() {
        this.$location.path('logout');
    }

    restaurarPass() {
        if (this.password.length >= 8 ) {
        if (this.password === this.repeatPassword){  
            this.DataService._baseUrl('POST','contrasena/restaurar', {
            email: this.email,
            codigo: this.codigo,
            contrasena: this.password
            })
            .then(respuesta => {
                if (respuesta && respuesta.finalizado) {
                    this.goLogin();
                    this.Message.success('Su contraseña fue correctamente restaurada.');
                } else {
                    if(!respuesta){
                        throw new Error('No se pudo restaurar la contraseña.');
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
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default RestaurarModalController;