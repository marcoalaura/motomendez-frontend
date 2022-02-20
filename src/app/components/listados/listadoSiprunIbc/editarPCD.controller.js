'use strict';

class EditarPCDController {
  constructor ($uibModalInstance, data, $log, DataService, Message, $state, $scope, $http, apiUrl, Loading, helpLang, Storage) {
    'ngInject';
    this.item = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.$scope = $scope;
    this.apiUrl = apiUrl;
    this.$http = $http;
    this.Loading = Loading;
    this.helpLang = helpLang;
    this.Storage = Storage;
  }

  $onInit () {
    this.tituloPagina = 'Modificar datos de carnet de discapacidad';
    this.cargarEstadosCiviles();
    this.cargarFormatosInformacion();
    this.cargarCarnetExpedicionDepartamento();
    this.pcd = {};
    this.rol = this.Storage.getUser().rol;
    this.visible = this.rol == 'IBC' ? false : true;
    this.secundario = this.item.visible;
    if (this.item.esEdicion) {
      this.DataService.get(`centralizador/tmp_pcd/${this.item.id}`)
        .then(response => {
          this.pcd = response.datos;
          this.pcd.estado_civil = response.datos.estado_civil ? { id: response.datos.estado_civil, val: this.estadosCiviles.find(e => e.id === response.datos.estado_civil).val } : '';
          this.pcd.formato_inf = { id: response.datos.formato_inf };
          this.pcd.expedido = response.datos.expedido ? { id: response.datos.expedido, val: this.expedicionDepartamentos.find(e => e.id == response.datos.expedido).val } : '';
          this.pcd.fecha_nacimiento = this.pcd.fecha_nacimiento ? this.pcd.fecha_nacimiento.toString().substr(0, 10) : this.pcd.fecha_nacimiento;
        });
    }
  }

  guardarCambios (validador) {
    if (validador.$valid) {
      let pcdSave = {
        casada_apellido: this.pcd.casada_apellido,
        telefono: this.pcd.telefono,
        direccion: this.pcd.direccion,
        estado_civil: this.pcd.estado_civil.id,
        formato_inf: this.pcd.formato_inf.id,
        expedido: this.pcd.expedido.id
      };
      let url;
      if (this.secundario) {
        pcdSave.fecha_nacimiento = this.pcd.fecha_nacimiento;
        pcdSave.complemento_documento = this.pcd.complemento_documento;
        pcdSave.primer_apellido = this.pcd.primer_apellido;
        pcdSave.segundo_apellido = this.pcd.segundo_apellido;
        pcdSave.nombres = this.pcd.nombres;
        url = `centralizador/tmp_pcd/${this.item.id}`;
      } else {
        url = `centralizador/tmp_pcd_secundario/${this.item.id}`;
      }

      // this.DataService.put(`centralizador/tmp_pcd/${this.item.id}`, pcdSave)
      this.DataService.put(url, pcdSave)
        .then(response => {
          if (response && response.finalizado) {
            // this.item.refresh;
            this.Message.success(response.mensaje);
            this.$state.reload();
            this.$uibModalInstance.close();
          }
        });
    } else {
      this.Message.warning('Debe llenar los campos obligatorios.');
    }
  }

  cargarEstadosCiviles () {
    this.estadosCiviles = [
      { id: 'C', val: 'CASADO/A' },
      { id: 'S', val: 'SOLTERO/A' },
      { id: 'V', val: 'VIUDO/A' }
    ];
  }

  cargarFormatosInformacion () {
    this.formatosInformacion = [
      { id: 'NUAC' },
      { id: 'U1AC' },
      { id: 'UTAC' }
    ];
  }

  cargarCarnetExpedicionDepartamento () {
    this.expedicionDepartamentos = [
      { id: 1, val: 'CHUQUISACA' },
      { id: 2, val: 'LA PAZ' },
      { id: 3, val: 'COCHABAMBA' },
      { id: 4, val: 'ORURO' },
      { id: 5, val: 'POTOSÍ' },
      { id: 6, val: 'TARIJA' },
      { id: 7, val: 'SANTA CRUZ' },
      { id: 8, val: 'BENI' },
      { id: 9, val: 'PANDO' }
    ];
  }

  cancel () {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default EditarPCDController;
