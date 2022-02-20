'use strict';

// import { timingSafeEqual } from "crypto";

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
    this.tituloPagina = 'Editar datos de la persona';
    this.cargarEstadosCiviles();
    this.cargarFormatosInformacion();
    this.cargarTiposDiscapacidad();
    this.cargarGradosDiscapacidad();
    this.cargarCarnetExpedicionDepartamento();
    this.pcd = {};
    this.rol = this.Storage.getUser().rol;
    this.requerido = this.rol == 'IBC' ? false : true;
    if (this.item.esEdicion) {
      this.DataService.get(`centralizador/tmp_corte_anual/${this.item.id}`)
        .then(response => {
          this.pcd = response.datos;
          this.pcd.estado_civil = response.datos.estado_civil ? { id: response.datos.estado_civil, val: this.estadosCiviles.find(e => e.id === response.datos.estado_civil).val } : '';
          this.pcd.formato_inf = { id: response.datos.formato_inf };
          this.pcd.exp_departamento = response.datos.exp_departamento ? { id: response.datos.exp_departamento, val: this.expedicionDepartamentos.find(e => e.id == response.datos.exp_departamento).val } : '';
        });
    }
  }

  guardarCambios (validador) {
    if (validador.$valid) {
      let pcdSave = {
        nro_documento: this.pcd.nro_documento,
        fecha_nacimiento: this.pcd.fecha_nacimiento,
        complemento: this.pcd.complemento,
        primer_apellido: this.pcd.primer_apellido,
        segundo_apellido: this.pcd.segundo_apellido,
        nombres: this.pcd.nombres,
        apellido_casada: this.pcd.apellido_casada,
        celular: this.pcd.celular,
        exp_pais: this.pcd.exp_pais,
        estado_civil: this.pcd.estado_civil.id,
        formato_inf: this.pcd.formato_inf.id,
        exp_departamento: this.pcd.exp_departamento.id
      };
      this.DataService.put(`centralizador/tmp_corte_anual/${this.item.id}`, pcdSave)
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

  cargarTiposDiscapacidad () {
    this.tiposDiscapacidad = [
      { id: 'AUDITIVO' },
      { id: 'FISICA MOTORA' },
      { id: 'INTELECTUAL' },
      { id: 'VISUAL' },
      { id: 'MULTIPLE' },
      { id: 'MENTAL O PSIQUICA' },
      { id: 'SENSORIAL' }
    ];
  }

  cargarGradosDiscapacidad () {
    this.gradosDiscapacidad = [
      { id: 'GRAVE' },
      { id: 'MUY GRAVE' }
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
