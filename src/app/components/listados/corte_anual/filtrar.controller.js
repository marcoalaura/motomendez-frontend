'use strict';

class FiltrarController {
  constructor($uibModalInstance, data, $log, DataService, Message, $state, $scope, $http, helpLang, apiUrl, Modal, Loading) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.$scope = $scope;
    this.helpLang = helpLang;
    this.apiUrl = apiUrl; 
    this.$http = $http;
    this.Modal = Modal;
    this.Loading = Loading;
  }

  $onInit() {
    this.tituloPagina = 'Filtrar archivos CSVs cargados';
    this.archivo = {};
    this.fecha = new Date();
    this.gestion = this.fecha.getFullYear() + 1;
  }

  filtrar() {
    // this.Modal.confirm('¿Está seguro de realizar el proceso de habilitación para la gestión ' + this.gestion + '.', () => {
    this.Loading.show(`Filtrando datos para obtener los registros habilitados CSV <br>Este proceso puede demorar, sea paciente...`, true);
    this.DataService.post('centralizador/filtrar_corte', {
      gestion: this.gestion
    })
    .then(response => {
      this.Loading.hide();
      if (response.finalizado) {
        this.Message['info']("Se ha realizado el proceso de habilitación.");
        this.cancel();
        this.$state.reload();
        return response.datos;          
      } else {
        this.Message['error'](response.mensaje);
      }
    })
    .catch((err) =>{
        this.$log.log(err);
    });
    //});
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

}

export default FiltrarController;