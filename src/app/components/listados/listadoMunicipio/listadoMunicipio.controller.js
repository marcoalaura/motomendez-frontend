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
    this.tieneRegularizados = true;
  }

  $onInit() {
    this.requerido = true;
    this.conf = {};
    this.gestion_anio();
    this.init_anio = this.init_anio;
    this.mensual = null;
    this.acumulado = null;
    /* this.$scope.$watch('$ctrl.id_gestion', () => {
      if (this.id_gestion) {
        this.gestion_mes();
      }
    }) */
    this.tieneRegularizados = true;
    // MENSAJE PARA RETROACTIVO
    // this.Modal.show({
    //   title: 'Aviso importante',
    //   message: 'A partir de la fecha, se puede acceder al listado de personas que regularizaron sus datos y se encuentran habilitadas para cobrar el bono de meses anteriores en esta pantalla.',
    //   labelOk: 'entendido',
    //   cancel: false
    // })
    //QUITAR DESPUÉS
  }

  generar_lista2 (form) {
    if (form.$valid) {
      let query = this.Storage.getUser().rol === 'MINISTERIO' ? {
        id_mes: this.fid_mes.id_mes
      } : {
        cod_municipio: this.Storage.getUser().dpa
      };
      this.DataService.list('centralizador/gestion/' + this.id_gestion.id_gestion, query)
        .then(response => {
          if (response) {
            this.mensual = response.datos.rows;

            this.DataService.list('centralizador/acumulado/' + this.id_gestion.id_gestion, query)
              .then(response => {
                if (response) {
                  this.acumulado = response.datos.rows;
                } else {
                  this.Message.info('No existe registros que coincidan con su búsqueda');
                }
              });
          } else {
            this.Message.info('No existe registros que coincidan con su búsqueda');
          }
        });
    }
  }

  generar_lista(form) {
    this.$log.log('1............', form.anio);
    if (form.$valid) {
      this.tableParams = new this.NgTableParams({
        count: 10
      }, {
        getData: params => {
          let data = params.url();
          let query;
          if (this.Storage.getUser().rol == 'MINISTERIO') {
            query = {
              id_mes: this.fid_mes.id_mes
            };
          } else {
            query = {
              limit: data.count,
              page: data.page,
              cod_municipio: this.Storage.getUser().dpa
            };
          }

          let sort = this.getSorting(data);
          if (sort) {
            query.order = sort;
          }
          this.$log.log('data:', data);
          return this.DataService.list("centralizador/gestion/" + this.id_gestion.id_gestion, query)
            .then(response => {
              this.$log.log('***Respuesta: ', response);
              if (response) {

                params.total(response.datos.count);
                this.renderLabels({
                  ini: (query.page - 1) * query.limit + 1,
                  end: query.page * query.limit < response.datos.count ? query.page * query.limit : response.datos.count,
                  total: response.datos.count
                });
                this.generar_lista_rezagados(form);
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
  departamentosLoad() {
    this.departamentos = [];
    this.provincias = [];
    this.municipios = [];

    this.DataService.get(`centralizador/dpa`)
      .then((response) => {
        if (response) {
          this.departamentos = response.datos.rows;
        }
      })
  }

  descargar_pdf() {
    this.fid_mes;
    this.cod_municipio;
    this.DataService.pdf('centralizador/pdf')
      .then(response => {
        this.$log.log(response);
      })
  }
  mostrar_pdf(municipio) {
      this.Modal.pdf({
        url: `centralizador/reporte/${municipio.id_reporte_mensual}`,
        title: `Listado del Municipio de ${municipio.dpa.municipio}`
      })
  }

  mostrar_pdf_regularizado(municipio) {
    this.Modal.pdf({
      url: `centralizador/reporte_regularizado/${municipio.id_reporte_retroactivo}`,
      title: `Listado de Regularizados del Municipio de ${municipio.dpa.municipio}`
    })
  }

  mostrar_pdf_acumulado (item) {
    this.Modal.pdf({
      url: `centralizador/reporte_acumulado/${item.id_reporte_acumulado}`,
      title: `Listado de Regularizados del Municipio de ${item.dpa.municipio}`
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
    this.DataService.get(`centralizador/gestion/detalle/listar?gestion=${this.id_gestion}`)
      .then(response => {
        this.mes = response.datos;
      });
  }
  cancelar() {
    this.mostrarPersonalDiscapacidad = false;
    this.mostrarPersonalTutor = false;
    this.empleado = {};
    this.empleado.tutor = 'Si';
    this.relacion = {};
    this.relaciones = [];
  }

  generar_lista_rezagados(form) {
    this.$log.log('1............', form.anio);
    if (form.$valid) {
      this.tableParams2 = new this.NgTableParams({
        count: 10
      }, {
        getData: params => {
          let data = params.url();
          let query;
          if (this.Storage.getUser().rol == 'MINISTERIO') {
            query = {
              id_mes: this.fid_mes.id_mes
            };
          } else {
            query = {
              limit: data.count,
              page: data.page,
              cod_municipio: this.Storage.getUser().dpa
            };
          }

          let sort = this.getSorting(data);
          if (sort) {
            query.order = sort;
          }
          this.$log.log('data 2:', data);
          return this.DataService.list("centralizador/gestion_regularizados/" + this.id_gestion.id_gestion, query)
            .then(response => {
              this.$log.log('***Respuesta: ', response);
              if (response) {

                params.total(response.datos.count);
                this.renderLabels({
                  ini: (query.page - 1) * query.limit + 1,
                  end: query.page * query.limit < response.datos.count ? query.page * query.limit : response.datos.count,
                  total: response.datos.count
                });
                this.tieneRegularizados = false;
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
}

export default ListadoBono;