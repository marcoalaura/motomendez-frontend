'use strict';

class EditarPcdController {
  constructor ($uibModalInstance, data, $log, DataService, Message, $state) {
    'ngInject';
    this.item = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
  }

  $onInit () {
    this.opciones = [
      { id: 1, nombre: 'Número documento identidad' },
      { id: 2, nombre: 'Complemento documento' },
      { id: 3, nombre: 'Fecha de nacimiento' },
      { id: 4, nombre: 'Nombres y apellidos' }
    ];
    this.limpiar();
    this.tituloPagina = 'Actualizar información PCD';
  }

  guardar (form) {
    if (form.$valid) {
      var datos = { id_pcd: this.item.id_pcd };
      if (this.opcion) {
        var seleccion = this.opciones.find(i => i.nombre === this.opcion);
        if (seleccion.id === 1) datos.documento_identidad = this.documento_identidad;
        if (seleccion.id === 2) datos.complemento = this.complemento;
        if (seleccion.id === 3) datos.fecha_nacimiento = this.fecha_nacimiento;
        if (seleccion.id === 4) datos.nombres = true;
      }
      if (this.otros) {
        datos.otros = true;
      }
      // this.$log.log('-------------------------------datos', datos);
      this.DataService.put('centralizador/edicion-pcd', datos)
        .then(response => {
          if (response) {
            this.Message.success('Datos actualizados correctamente.');
            this.item.refresh;
            // this.$state.reload();
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

  limpiar () {
    this.documento_identidad = '';
    this.complemento = '';
    this.fecha_nacimiento = '';
    this.opcion = null;
    this.otros = false;
  }
}
export default EditarPcdController;
