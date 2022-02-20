'use strict';

class ContrastarController {
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
    this.tituloPagina = 'Contrastar información del corte cargada';
    this.archivo = {};
    this.fecha = new Date();
    this.gestion = this.fecha.getFullYear() + 1;
  }

  contrastar() {
    this.Loading.show(`Realizando el proceso inicial de contrastación<br>Este proceso puede demorar, sea paciente...`, true);
    this.DataService.post('centralizador/contrastar_corte_anual', {
      gestion: this.gestion
    })
    .then(response => {
      this.Loading.hide();
      if (response.finalizado) {
        this.Message['info']("Se ha realizado el proceso de contrastación.");
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
    // });
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

}

export default ContrastarController;