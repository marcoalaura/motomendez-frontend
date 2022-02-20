'use strict';

import modalTemplate from './habilitarCorteAnual.html';
import modalController from './habilitarCorteAnual.controller';

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
  }

  $onInit () {
    this.fechaActual = new Date();
    this.mesActual = this.fechaActual.getMonth();
    this.diaActual = this.fechaActual.getDate();
    this.gestion = this.fechaActual.getFullYear();
    this.listaLoad();
    this.habilitadaLoad();
  }

  listaLoad () {
    this.DataService.get(`centralizador/control_corte/lista_control_corte?tipo=ANUAL`)
      .then((response) => {
        if (response) {
          this.controlCorte = response.datos;
        } else {
          const error = response.mensaje || 'Ocurrio un error mientras se realizaba el listado de controles anuales.';
          this.Message.error(error);
        }
      });
  }

  habilitadaLoad () {
    this.DataService.get(`centralizador/control_corte/detalle_control_corte?tipo=ANUAL`)
      .then((response) => {
        if (response && response.datos) {
          this.habilitadaCreacion = false;
        } else {
          this.habilitadaCreacion = true;
        }
      });
  }

  abrirPaginaOperaciones (gestion) {
    this.Storage.set('gestion_valida', gestion);
    this.$location.path(`/operaciones_anual/operaciones/`);
  }

  habilitarCorteAnualConfirmacion (id) {
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
