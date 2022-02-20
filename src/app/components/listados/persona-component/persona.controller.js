'use strict';

class PersonaController {
  constructor(DataService, Datetime) {
    'ngInject';
    this.DataService = DataService;
    this.Datetime = Datetime;
  }

  $onInit() {
    this.loadingPersona = false;
    this.tipoGenero = [
      {
        id: 1,
        text: 'Masculino'
      }, {
        id: 2,
        text: 'Femenino'
      }
    ];
    this.tipoTutor = [
      {
        id: 1,
        text: 'Si'
      }, {
        id: 2,
        text: 'No'
      }
    ];
  }

  /**
   * validarSegip - Método para validar los datos de una persona por SEGIP 
   * 
   * @memberof PersonaController
   */
  validarSEGIP() {
    if (this.modelPersona.ci && this.modelPersona.fechaNacimiento) {
      let servicio = this.discapacitado ? 'pcd' : 'segip';
      this.loadingPersona = true;
      this.DataService.get(`persona/servicio/${servicio}?ci=${this.modelPersona.ci}&fecha_nacimiento=${this.Datetime.format(this.modelPersona.fechaNacimiento,'YYYY/MM/dd')}`)
        .then(response => {
          if (response && response.finalizado) {
            this.modelPersona.nombre = response.datos.nombres;
            this.modelPersona.primerApellido = response.datos.primer_apellido;
            this.modelPersona.segundoApellido = response.datos.segundo_apellido;
            this.modelPersona.idPersona = response.datos.id_persona;
          }
          this.loadingPersona = false;
        });
    } else {
      this.form[`fecha_nacimiento${this.id}`].$touched = true;//this.modelPersona.fecha_nacimiento != undefined ? true : false;
      this.form[`cedula_identidad${this.id}`].$touched = true;//this.modelPersona.ci != undefined ? true : false;
    }
  }
}
export default PersonaController;