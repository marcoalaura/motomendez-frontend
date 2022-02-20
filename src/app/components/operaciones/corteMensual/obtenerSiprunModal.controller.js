'use strict';

class EditarPcdController {
  constructor ($uibModalInstance, data, $log, DataService, Message, $state) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
  }

  $onInit () {
    this.tituloPagina = 'Obtener datos de SIPRUNPCD';
  }

  guardar (form) {
    if (form.$valid) {
      this.DataService.get(`siprunpcd-ci?documento_identidad=${this.documento_identidad}&fecha_emision=${this.fecha_emision}`)
        .then(response => {
          if (response) {
            this.Message.success('Datos actualizados correctamente.');
            this.$state.reload();
            this.$uibModalInstance.close();
          }
        });
    } else {
      this.Message.warning('Datos incorrectos, revise el formulario antes de enviarlo');
    }
  }

  cancel () {
    this.$uibModalInstance.dismiss('cancel');
  }
}
export default EditarPcdController;
