'use strict';

class InactivarPcdController {
  constructor ($uibModalInstance, data, $log, DataService, Message, $state, Modal) {
    'ngInject';
    this.item = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.Modal = Modal;
  }

  $onInit () {
    this.tituloPagina = 'Registro de baja de PCD';
  }

  guardar (form) {
    if (form.$valid) {
      this.Modal.confirm(`¿Esta seguro de continuar con la modificación del registro?`, () => {
        var datos = {
          id_pcd: this.item.id_pcd,
          descripcion: this.descripcion
        };
        this.DataService.put('centralizador/inhabilitar-pcd', datos)
          .then(response => {
            if (response) {
              this.Message.success('Datos actualizados correctamente.');
              this.item.refresh;
              this.$state.reload();
              this.$uibModalInstance.close();
            }
          });
      }, () => {}, 'Confirmación', 'confirmar');
    } else {
      this.Message.warning('Datos incorrectos, revise el formulario antes de enviarlo');
    }
  }

  cancel () {
    this.$uibModalInstance.dismiss('cancel');
  }
}
export default InactivarPcdController;
