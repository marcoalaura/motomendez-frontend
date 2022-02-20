'use strict';

class HabilitarCorteAnual {
  constructor ($uibModalInstance, $location, data, $log, DataService, Message, $state) {
    'ngInject';
    this.items = data;
    this.$location = $location;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.confirmado = false;
  }

  $onInit () {
    this.tituloPagina = 'Confirme habilitación de proceso de corte anual';
    this.gestion = (new Date()).getFullYear();
  }
  cancel () {
    this.$uibModalInstance.dismiss('cancel');
  }

  habilitarCreacionCorte () {
    this.DataService.post(`centralizador/control_corte/habilitar_control_corte`, { gestion: this.gestion, tipo: 'ANUAL' })
      .then(response => {
        if (response && response.finalizado) {
          this.$location.path(`/operaciones_anual/operaciones/${this.gestion}`);
          this.$uibModalInstance.dismiss('cancel');
          this.$state.reload();
        }
      });
  }
}
export default HabilitarCorteAnual;
