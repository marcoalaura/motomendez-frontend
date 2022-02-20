'use strict';

class CInputChipsController {
  constructor(){
    this.mensajeMaximo = false;
  }
  $onInit(){
     let tipoValidacion = this.ngValidation;
        switch (tipoValidacion) {
          case 'correo':
            this.messageErrorPattern = 'Introduzca una dirección de correo válido.';
            this.validation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            break;
          case 'celular':
            this.validation = /(6[0-9]{7}|7[0-9]{7})/;
            this.messageErrorPattern = 'Introduzca un número de celular válido';
            break;
          case 'telefono':
            this.validation = /^([0-9 +()-]{5,15})$/;
            this.messageErrorPattern = 'Introduzca un número de teléfono o celular válido';
            break;
          default:
           this.validation = null;
        }
    this.maxTags = angular.isUndefined(this.maxTags)?0: this.maxTags;
  }
}
export default CInputChipsController;
