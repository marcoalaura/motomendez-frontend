'use strict';

class SubirCSVController {
  constructor ($uibModalInstance, data, $log, DataService, Message, $state, $scope, $http, apiUrl, Loading) {
    'ngInject';
    // this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.$scope = $scope;
    this.apiUrl = apiUrl;
    this.$http = $http;
    this.Loading = Loading;
  }

  $onInit () {
    this.tituloPagina = 'Importar archivo CSV';
    this.archivo = null;
  }

  enviarCSV () {
    if (this.archivo === null) {
      var type = 'warning';
      this.Message[type]('Debe adjuntar el archivo CSV.');
    } else {
      var fd = new FormData();
      fd.append('file', this.archivo);
      this.Loading.show(`Cargando datos del archivo CSV <br>Este proceso puede demorar, sea paciente...`, true);
      this.$http.post(this.apiUrl + 'centralizador/crear_corte', fd, {transformRequest: angular.identity, headers: { 'Content-Type': undefined }})
        .then(response => {
          this.Loading.hide();
          if (response.data) {
            // this.items.refresh;
            this.$state.reload();
            this.$uibModalInstance.close();
            this.Message.success(response.data.mensaje);
          }
        })
        .catch(error => this.DataService.msgError(error));
    }
  }

  cancel () {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default SubirCSVController;
