'use strict';

class TutorAgregarController {
  constructor($uibModalInstance, data, $log, DataService, Message, $state) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.permitido = false;
  }

  $onInit() {
    this.generos = [{
      id:1,
      nombre: 'Masculino',
    }, {
      id: 2,
      nombre: 'Femenino',
    }]
    this.extensiones_permitidas = new Array("image/png", "image/jpg", "application/pdf");
    this.$log.log('Datos obtenidos enviados = ', this.items);
    this.tituloPagina = 'Asignación de Tutor';
    this.obterner_parametros()

  }
  ok(form) {
    //if (angular.isUndefined(this.usuario)  || !this.usuario.telefono || !this.usuario.documento_descripcion ) {
    //  this.Message["warning"]("Debe llenar la información del formulario.");
    //  return;
    //} 
    if (this.fileBase64) {
      for (var i = 0; i < this.extensiones_permitidas.length; i++) {
        if (this.extensiones_permitidas[i] == this.fileBase64.type) {
          this.permitido = true;
          break;
        }
      }
    }
    if (form.$valid) {
      if (this.permitido == false && this.fileBase64) {
        this.Message["error"]("El formato de archivo no es válido, el sistema solo acepta pdf's, png y jpg.");
      } else {
        this.usuario.fid_persona = this.data.usuario.id_persona;
        this.usuario.fid_pcd = this.items.id_pcd;
        this.usuario.fid_parametro = this.usuario.fid_parametro.id_parametro;
        if (this.fileBase64) {
          this.usuario.documento_ruta = this.fileBase64.data;
        }
        this.$log.log('ID de persona seleccionada = ', this.usuario.fid_persona);

        this.DataService.post('centralizador/pcd/' + this.items.id_pcd + '/tutor/' + this.usuario.fid_persona, this.usuario)
          .then(response => {
            if (response) {
              this.$log.log('Respuesta a***= ', response);
              this.Message.success('Tutor registrado exitosamente.');
              this.items.refresh;
              this.$state.reload();
              this.$uibModalInstance.close();
            }
          });
      }
    } else {
      this.Message.warning("Datos incorrectos, revise el formulario antes de enviarlo");
    }


  }
  obterner_parametros() {
    this.DataService.get('centralizador/parametro?grupo=PARENTESCO')
      .then(response => {
        if (response) {
          this.parentesco = response.datos.rows;
        }
      });
  }
  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}
export default TutorAgregarController;