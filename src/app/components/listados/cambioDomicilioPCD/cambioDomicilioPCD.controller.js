'use strict';
class cambioDomicilioPCD {
  constructor($location, DataService, Message, Modal, $log, $scope) {
    'ngInject';
    //this.ValidationService = ValidationService;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.pcd = [];
    this.$log = $log;
    this.$scope = $scope;
    this.$scope.oneAtATime = true;

  }

  $onInit() {
    //  
  }
  descargar() {
    this.DataService.file('solicitudes', 'application/csv', null, true)
    .then(response => {
      if (response) {
        const link = document.createElement('a');
        link.href = response;
        link.setAttribute('download', 'reporteCambioMunicipio.csv');
        document.body.appendChild(link);
        link.click();
      }
    })
  }
}

export default cambioDomicilioPCD;
