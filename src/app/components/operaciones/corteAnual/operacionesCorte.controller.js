'use strict';

class OperacionesCorte {
  constructor ($location, DataService, Message, Modal, $scope, Storage, $log, $state, NgTableParams, Loading) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.Storage = Storage;
    this.rol = this.Storage.getUser().rol;
    this.$log = $log;
    this.$state = $state;
    this.Loading = Loading;
  }

  $onInit () {
    this.disable = false;
    // this.gestion = (new Date()).getFullYear();
    this.gestion = this.Storage.get('gestion_valida');
    this.obtenerDetalleControlCorte();
  }

  volverControlCorte () {
    this.$location.path(`/operaciones_anual`);
  }

  obtenerDetalleControlCorte () {
    this.DataService.get(`centralizador/control_corte/detalle_control_corte?tipo=ANUAL&gestion=${this.gestion}`)
      .then((response) => {
        if (response) {
          this.detalleControlCorteAnual = response.datos;
          this.operaciones = JSON.parse(response.datos.pasos);
        }
        return this.operaciones;
      });
  }

  actualizarProceso (orden, proceso) {
    this.Modal.confirm(`<p><b>PROCESO: </b> ${proceso}</p>`, () => {
    this.disable = true;
    this.DataService.put(`centralizador/control_corte/actualizar_control_corte/${this.detalleControlCorteAnual.id_control_corte}`, { orden, tipo: 'ANUAL' })
      .then(response => {
        if (response && response.finalizado) {
          let url = this.operaciones[orden - 1].api;
          let tipo = this.operaciones[orden - 1].tipo;
          this.Loading.show(`Este proceso del corte puede demorar, <br>sea paciente por favor...`, true);
          if (tipo == 'POST') {
            this.DataService.post(url) 
            .then(response2 => {
              this.Loading.hide();
              if (response2.finalizado) {
                this.Message.success(response2.mensaje);
              } else {
                this.Message.error(response2.mensaje);
              }
              this.$state.reload();
            });
          } else {
            this.DataService.get(url) 
             .then(response2 => {
              this.Loading.hide();
              if (response2.finalizado) {
                this.Message.success('ok');
              } else {
                this.Message.error(response2.mensaje);
              }
              this.$state.reload();
            });
          }
        } else {
          this.Message.error('Ocurrió un error mientras se realizaba la ejecución del servicio.');
        }
      });
    }, () => {}, '¿Esta seguro de ejecutar el siguiente proceso?', 'Confirmar', 'Cancelar', '-', 'lg');
  }
}

export default OperacionesCorte;
