'use strict';

class DocumentoIdentidadController {

    constructor($scope, DataService, Datetime, Message, $log) {
        'ngInject';
        this.$scope = $scope;
        this.DataService = DataService;
        this.Datetime = Datetime;
        this.Message = Message;
        this.$log = $log;
        // this.init = false;
    }

    $onInit () {

      // this.$log.log('DocumentoIdentidadController init');
      // this.$log.log(this);
      if (!this.ngModel) this.ngModel = {};

      this.initDefault('tipo_documento', 'CARNET_IDENTIDAD');
    }

    isCI () {
      return this.ngModel.tipo_documento=='CARNET_IDENTIDAD';
    }

    isFill () {
      // return this.ngModel.nombres && this.ngModel.primer_apellido;
      return this.ngModel.id_persona;
    }

    initDefault (key, val) { if (!this.ngModel[key]) this.ngModel[key] = val; }

    changeType() {
        this.nombreDel();
    }

    nombreDel () {
      delete this.ngModel.nombres;
      delete this.ngModel.primer_apellido;
      delete this.ngModel.segundo_apellido;
      delete this.ngModel.id_persona;
      delete this.ngModel.documento_identidad;
      delete this.ngModel.complemento;
      delete this.ngModel.fecha_nacimiento;
    }

    isDisabled() {
        return angular.isUndefined(this.ngModel.documento_identidad) || !this.Datetime.isDate(this.ngModel.fecha_nacimiento) || angular.isUndefined(this.ngModel.nombres);
    }

    search() {
      // this.Message.loading("Buscando datos en el SEGIP, esta operación puede demorar.");
      var ci, datos;
      if (this.ngModel.documento_identidad.indexOf('-') !== -1) {
        datos = this.ngModel.documento_identidad.split('-');
        ci = datos[0];
        //complemento = datos[1];
      } else {
        ci = this.ngModel.documento_identidad;
      }
      var datos_persona ={
        "cedula_identidad":ci,
        'fecha_nacimiento': this.Datetime.format(this.ngModel.fecha_nacimiento,'dd/MM/YYYY'),
        'nombres': this.ngModel.nombres,
        'primer_apellido': this.ngModel.primer_apellido,
        'segundo_apellido': this.ngModel.segundo_apellido
        //"fecha_nacimiento": this.Datetime.format(this.ngModel.fecha_nacimiento,'YYYY/MM/dd')
      }
      if (this.ngModel.complemento) datos_persona.complemento = this.ngModel.complemento.toUpperCase();
      // this.$log.log(ci,complemento,datos);
      //?ci=${ci}&fecha_nacimiento=${this.Datetime.format(this.ngModel.fecha_nacimiento,'dd/MM/YYYY')}${complemento?'&complemento='+complemento.toUpperCase():''}
      // this.DataService.post(`centralizador/servicio/segip?ci=${ci}&fecha_nacimiento=${this.Datetime.format(this.ngModel.fecha_nacimiento,'YYYY/MM/dd')}`, datos_persona)
      this.DataService.post(`centralizador/servicio/segip`, datos_persona)
      .then( response => {
        
        // this.nombreDel();
        if (response) {
          this.ngModel.nombre_completo = response.datos.nombre_completo;
          this.$log.log("response.............................",response );
          this.ngModel.id_persona = response.datos.id_persona;
        }
      });
    }
}

export default DocumentoIdentidadController;
