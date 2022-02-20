'use strict';

import modalTemplate from './habilitarCorteMensual.html';
import modalController from './habilitarCorteMensual.controller';

class CorteMensual {
  constructor ($location, DataService, Message, Modal, $scope, Storage, $log, NgTableParams) {
    'ngInject';
    // this.ValidationService = ValidationService;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.Storage = Storage;
    this.rol = this.Storage.getUser().rol;
    this.$log = $log;
    this.months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  }

  $onInit () {
    // this.nomreMesActual = this.months[new Date().getMonth()];
    this.fechaActual = new Date();
    this.mesActual = this.fechaActual.getMonth() + 1;
    this.diaActual = this.fechaActual.getDate();
    this.gestion = this.fechaActual.getFullYear();
    this.listaLoad();
    this.habilitadaLoad();
  }

  listaLoad () {
    this.DataService.get(`centralizador/control_corte/lista_control_corte?tipo=MENSUAL`)
      .then((response) => {
        if (response) {
          this.controlCorte = response.datos;
        }
      });
  }

  habilitadaLoad () {
    this.DataService.get(`centralizador/control_corte/detalle_control_corte?tipo=MENSUAL`)
      .then((response) => {
        if (response && response.datos) {
          this.habilitadaCreacion = false;
        } else {
          this.habilitadaCreacion = true;
        }
      });
  }

  abrirPaginaOperaciones () {
    this.$location.path(`/operaciones_mensual/operaciones/`);
  }

  habilitarCorteMensualConfirmacion (id) {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      location: this.$location,
      data: id,
      size: 'lg'
    });
  }
}

export default CorteMensual;
