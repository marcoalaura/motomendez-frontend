'use strict';

class SelectMunicipioController {

    constructor($scope, $log, DataService) {
        'ngInject';
        this.$scope = $scope;
        this.$log = $log;
        this.DataService = DataService;
    }

    $onInit () {

      
      this.departamentosLoad();
      this.init_provincias = this.provincia;
      this.init_municipios = this.municipio;
      this.$log.log('', this.$scope.$watch());
      this.$scope.$watch('$ctrl.id_dpa', () => {
        if (this.id_dpa) {
          this.provinciasLoad();
        }
      })
      this.$scope.$watch('$ctrl.fid_provincia', ()=>{
        if (this.fid_provincia) {
          this.municipiosLoad();
        }
      })
    }

    departamentosLoad () {
      this.departamentos = [];
      this.provincias = [];
      this.municipios = [];

      this.DataService.get(`centralizador/dpa`)
      .then( (response) => {
        if (response) {
          this.departamentos = response.datos.rows;
        }
      })
    }

    provinciasLoad () {
      this.provincias = [];
      this.municipios = [];
      if (!this.init_provincias) {
        delete this.provincia;
        delete this.municipio;
      }
      this.init_provincias = !1;

      this.DataService.get(`centralizador/dpa/`+this.id_dpa )
      .then( (response) => {
        if (response) {
          this.provincias = response.datos.rows;
        }
      })
    }

    municipiosLoad () {

      this.municipios = [];
      if (!this.init_municipios) {
        delete this.municipio;
      }
      this.init_municipios = !1;
      this.DataService.get('centralizador/dpa/'+ this.id_dpa+'/provincia/'+this.fid_provincia)
      .then( (response) => {
        if (response) {
          this.municipios = response.datos.rows;
        }
      })

    }

}


export default SelectMunicipioController;
