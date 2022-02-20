'use strict';
class informacionPCD {
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
  }
  enviar(form) {
    this.Modal.confirm('¿Esta seguro de que desea enviar la solicitud?', () => {
      let datosSoporte = {
        incidente: this.incidente,
        descripcion: this.descripcion,
      };
      this.DataService.post('centralizador/soporte', datosSoporte)
      .then(response => {
        if (response) {
          this.Message.success('Su incidente se registro con exito.');
          this.incidente=null;
          this.descripcion=null;
          form.$setPristine();
          form.$setUntouched();
          this.$location.path('soporte');
        } 
      })
    }, () => {
      //this.$location.path('listado_general');
    }, 'Confirmación');
  }

}

export default informacionPCD;
