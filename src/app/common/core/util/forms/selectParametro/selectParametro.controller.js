'use strict';

class SelectParametroController {

  constructor(DataService, $log, $scope) {
    'ngInject';
    this.DataService = DataService;
    this.$log = $log;
    this.$scope = $scope;
  }

  $onInit() {
    // this.$log.log(this);

    if (!this.key)
      this.key = 'nombre';
    if (!this.typeSelect)
      this.typeSelect = 'id';
    var url = `parametros/?grupo=${this.parametro}`;
    if (this.query)
      url += this.query;
    this.DataService.get(url)
    .then((response) => {
      this.items = response;
      //Quitando columna unidades para que el filtro se realice, segun observacion de G.E.
      for (var i = 0; i < this.items.length; i++) {
        var obj = this.items[i];
        delete obj.grupo;
      }
//      this.$log.log(' ****************ARRAY de VALORES ***: ', this.items);
      //si es opcional aniadimos un valor al combo que sera la bandera para no validar demas eventos
      var isTrueSet = (this.opcional === 'true');
      if (isTrueSet) {
        this.$log.log(' OPCIONAL***: ');
        this.items.unshift({
          descripcion: 'Sin valor',
          estado: 'estado',
          id_parametro: null,
          nombre: 'Ninguno',
          order: 1,
          sigla: 'Ninguno'
        });
      }
    })

    this.$scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (angular.toJson(newValue) != angular.toJson(oldValue)) {
        this.ngChange();
      }
    })

  }
}


export default SelectParametroController;
