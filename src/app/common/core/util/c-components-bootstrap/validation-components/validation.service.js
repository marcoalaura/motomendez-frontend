'use strict';

class ValidationService {
  constructor(){
    'ngInject';
    this.validaciones = [];
  }

  $onInit() {
    this.validaciones = this.getTiposValidaciones();
  }

  /**
   * validar - Método para obtener el tipo de validacion mensaje y regex
   * 
   * @param {string} tipoValidacion 
   * @returns {object} validacion
   * @memberof ValidationService
   */
  validar(tipoValidacion){
    this.validaciones = this.getTiposValidaciones();
    for (let objeto of this.validaciones) {
      if (objeto.nombre === tipoValidacion) {
        return objeto;
      }
    }
    return null;
  }

  /**
   * activarErrores - Método para activar los errores que existen en un formulario
   * 
   * @param {object} formulario 
   * @memberof ValidationService
   * @returns {boolean}
   */
  activarErrores(formulario) {
    if (formulario.$invalid) {
      angular.forEach(formulario.$error, (controls) => {
        angular.forEach(controls, (control) => {
            control.$touched = true;
        })
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * getTipoValidaciones - array con los tipos de validaciones
   * 
   * @returns {array} 
   * @memberof ValidationService
   */
  getTiposValidaciones() {
    let validaciones = [
      {
        id: 1,
        nombre: 'correo',
        mensaje: 'Introduzca una dirección de correo válido.',
        validacion: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      },
      {
        id: 2,
        nombre: 'celular',
        mensaje: 'Introduzca un número de teléfono o celular válido.',
        //validacion: /(6[0-9]{7}|7[0-9]{7})/,
        validacion: /^(6[0-9]{7}|7[0-9]{7}|2[0-9]{6,7}|3[0-9]{6,7}|4[0-9]{6,7})$/,
      },
      {
        id: 3,
        nombre: 'telefono',
        mensaje: 'Introduzca un número de teléfono válido.',
        validacion: /^(\+((\d{3}|\d{2}))( |-)\d{5,15}|(\d{7})|(\d{8}))$/,
      },
      {
        id: 4,
        nombre: 'url',
        mensaje: 'Introduzca una dirección web válida.',
        validacion: /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i
      },
      {
        id: 5,
        nombre: 'numerico',
        mensaje: 'Introduzca sólo números',
        validacion: /^[0-9]+$/
      },
      {
        id: 6,
        nombre: 'monetario',
        mensaje: 'Introduzca sólo números con decimales.',
        validacion: /^[0-9]|[0-9]+(\.[0-9]{1,2})+$/
      },
      {
        id: 7,
        nombre: 'texto',
        mensaje: 'Introduzca solo texto.',
        validacion: /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/
      },
      {
        id: 8,
        nombre: 'texto-numerico',
        mensaje: 'Introduzca solo texto o numeros y caracteres permitidos.',
        validacion: /^[0-9a-záéíóúñA-ZÁÉÍÓÚÑ."'&@\-\s]+$/
      },
      {
        id: 9,
        nombre: 'alfa-numerico',
        mensaje: 'Introduzca solo texto o números',
        validacion: /^[a-zñA-ZÑ0-9-".'\s]/
      },
      {
        id: 10,
        nombre: 'ci',
        mensaje: 'Introduzca un CI valido',
        validacion: /^[0-9]{3,10}(-[0-9A-Z]{2}){0,1}$/ 
      }
    ];
    return validaciones;
  }
}

export default ValidationService;