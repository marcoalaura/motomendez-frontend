'use strict';

class CInputController {
    constructor(ValidationService) {
      'ngInject';
      this.ValidationService = ValidationService;
    }

    $onInit() {
        this.tipo = angular.isDefined(this.isPassword)? 'password' : 'text';
        this.validation = '';
        if (this.ngValidation) {
          let objetoValidacion = this.ValidationService.validar(this.ngValidation);
          this.validation = objetoValidacion.validacion;
          this.messageErrorPattern = objetoValidacion.mensaje;
        }
        if (angular.isUndefined(this.placeholder)) {
          this.placeholder = this.label;
        }
  }
  borrar() {
    this.ngModel = null;
  }
}
export default CInputController;
