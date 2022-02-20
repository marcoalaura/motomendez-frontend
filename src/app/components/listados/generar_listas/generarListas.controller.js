'use strict';

// import modalController from './subirCSV.controller.js';
// import modalTemplate from './subirCSV.html';

class GenerarListas {
  constructor($location, DataService, Message, Modal, $scope, $log, NgTableParams, $window, $state, Loading) {
    'ngInject';
    //this.ValidationService = ValidationService;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.$log = $log;
    this.$window = $window;
    this.$state = $state;
    this.Loading = Loading;
  }

  $onInit() {
    this.listar_listas();
  }

  // add() {
  //   this.Modal.show({
  //     template: modalTemplate,
  //     controller: modalController,
  //     data: '',
  //     size: 'lg'
  //   });
  // }

  listar_listas() {
    this.DataService.get(`centralizador/gestion`)
      .then(resolve => {
        this.listas_generadas = resolve.datos;
        return resolve;
      })
  }
  generar_mes() {
    this.DataService.get(`centralizador/corte_mensual`)
      .then(resolve => {
        if (resolve) {
          this.Loading.show('Generando Reportes Mensuales, espere', true);
          setTimeout( () => this.Loading.hide());
          this.Message.success('Reporte Generado Exitosamente.');
          this.$state.reload();
          return resolve;
        }
      })
  }
  enviar_lista(){
    this.$log.log('2....................');
  }
  beneficios(user) {
    this.var = true;
    this.$log.log(user);
    this.beneficiario = user;
  }
  generar_anio() {
    this.DataService.get(`centralizador/corte`)
      .then(resolve => {
        if (resolve) {
          this.Message.success('Reporte Generado Exitosamente.');
          this.$state.reload();
          return resolve;
        }
      })
  }
  mostrar_pdf(gestion) {
    this.Modal.pdf({
      url: `centralizador/reporte_anual/${gestion}`,
      title: `Reporte corte anual ${gestion}`
    })
  }

  /**
   * cancelar = 'Metodo que borra el formulario'
   */
  cancelar() {
    this.mostrarPersonalDiscapacidad = false;
    this.mostrarPersonalTutor = false;
    this.empleado = {};
    this.empleado.tutor = 'Si';
    this.relacion = {};
    this.relaciones = [];
  }
}

export default GenerarListas;