'use strict';
class ListadoBono {
  constructor($location, DataService, Message, Modal, $scope, Storage, $log, NgTableParams) {
    'ngInject';
    //this.ValidationService = ValidationService;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.Storage = Storage;
    this.rol = this.Storage.getUser().rol;
    this.$log = $log;

  }

  $onInit() {
    this.requerido = true;
    this.conf = {};
    this.generar_lista();
    this.gestion_anio();
  }

  generar_lista() {
    this.tableParams = new this.NgTableParams({
      count: 10
    }, {
      getData: params => {
        let data = params.url();
        let query;
        query = {
          limit: data.count,
          page: data.page,
          documento_identidad: this.documento_identidad ? this.documento_identidad : '',
          primer_apellido: this.primer_apellido ? this.primer_apellido : '',
          segundo_apellido: this.segundo_apellido ? this.segundo_apellido : '',
          nombres: this.nombres ? this.nombres : '',
          gestion: this.id_gestion ? this.id_gestion.id_gestion : ''
        };
        let sort = this.getSorting(data);
        if (sort) {
          query.order = sort;
        }
        this.$log.log('data:', data);
        // centralizazor/
        return this.DataService.list("centralizador/siprun/corte", query)
          .then(response => {
            if (response) {
              params.total(response.datos.count);
              this.renderLabels({
                ini: (query.page - 1) * query.limit + 1,
                end: query.page * query.limit < response.datos.count ? query.page * query.limit : response.datos.count,
                total: response.datos.count
              });
              return response.datos.rows;
            } else {
              this.Message.info('No existe registros que coincidan con su búsqueda');
            }
          });
      }
    });


  }
  renderLabels(params) {
    params;
  }
  getSorting(params) {
    for (let key in params) {
      if (key.indexOf('sorting') != -1) {
        return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
      }
    }
    return null;
  }

  gestion_anio() {
    this.DataService.get(`centralizador/gestion/detalle/listar`)
      .then(response => {

        this.gestion = response.datos;
      });
  }
}

export default ListadoBono;