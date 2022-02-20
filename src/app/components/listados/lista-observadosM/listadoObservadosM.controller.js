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
    this.buscar_municipio();
    this.requerido = true;
    this.gestion_anio();
    this.init_anio = this.init_anio
    this.$scope.$watch('$ctrl.id_gestion', () => {
      if (this.id_gestion) {
        this.gestion_mes();
      }
    })
  }
  generar_lista(form) {
    if (form.$valid) {
      this.tableParams = new this.NgTableParams({
        count: 10
      }, {
        getData: params => {
          let data = params.url();
          let query = {
            limit: data.count,
            page: data.page,
            gestion: this.id_gestion.id_gestion,
            mes: this.fid_mes.mes
          };
          if (this.documento) {
            query.documento = this.documento;
          }
          let sort = this.getSorting(data);
          if (sort) {
            query.order = sort;
          }
          this.$log.log('data:', data);
          // centralizazor/
          return this.DataService.list("centralizador/observados", query)
            .then(response => {
              this.$log.log('***Respuesta: ', response);
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
    } else {
      this.Message.warning('Complete todos los campos señalados');
    }

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
  buscar_municipio(){
    this.$scope.$watch('$ctrl.municipio', () => {
      this.$log.log('1............................', this.municipio);
      this.DataService.get(`centralizador/dpa/municipio/buscar?nombre=${this.municipio}`)
      .then((response) => {
        this.municipios = response.datos.rows;
        this.$log.log('1.......1', response);
      })

    })
  }
  gestion_anio() {
    this.DataService.get(`centralizador/gestion/detalle/listar`)
      .then(response => {
        this.gestion = response.datos;
      });
  }

  gestion_mes() {
    if (!this.init_anio) {
      delete this.fid_mes;
    }
    this.init_anio = !1;
    this.DataService.get(`centralizador/gestion/detalle/listar?gestion=${this.id_gestion.id_gestion}`)
      .then(response => {
        this.mes = response.datos;
      });
  }

}

export default ListadoBono;