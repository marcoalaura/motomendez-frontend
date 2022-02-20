'use strict';
class ListadoBonoRegularizado {
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
    this.departamentosLoad();
    this.gestion_anio();
    this.init_provincias = this.provincias;
    this.init_municipios = this.municipios;
    this.init_anio = this.init_anio
    this.$scope.$watch('$ctrl.departamento', () => {
      if (this.departamento) {
        this.provinciasLoad();
      }
    })
    this.$scope.$watch('$ctrl.fid_provincia', () => {
      if (this.fid_provincia) {
        this.municipiosLoad();
      }
    })
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
          let query;

          query = {
            mes: this.mes.mes,
            limit: data.count,
            page: data.page,
          };


          let sort = this.getSorting(data);
          if (sort) {
            query.order = sort;
          }
          this.$log.log('data:', data);
          // return this.DataService.list("centralizador/gestion_regularizados/" + this.id_gestion.id_gestion, query)
          return this.DataService.list("centralizador/acumulado/" + this.id_gestion.id_gestion, query)
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
      url: `centralizador/reporte_regularizado/${municipio.id_reporte_retroactivo}`,
      title: `Listado de Regularizados del Municipio de ${municipio.dpa.municipio}`
    })
  }

  mostrar_pdf_acumulado(item) {
    this.Modal.pdf({
      url: `centralizador/reporte_acumulado/${item.id_reporte_acumulado}`,
      title: `Listado de Regularizados del Municipio de ${item.dpa.municipio}`
    })
  }

  provinciasLoad() {
    this.provincias = [];
    this.municipios = [];
    if (!this.init_provincias) {

      delete this.cod_municipio;
      delete this.fid_provincia;
    }
    this.init_provincias = !1;

    this.DataService.get(`centralizador/dpa/` + this.departamento)
      .then((response) => {
        if (response) {
          this.provincias = response.datos.rows;
        }
      })
  }

  municipiosLoad() {
    this.municipios = [];
    if (!this.init_municipios) {
      delete this.cod_municipio;
    }
    this.init_municipios = !1;
    this.DataService.get('centralizador/dpa/' + this.id_dpa + '/provincia/' + this.fid_provincia)
      .then((response) => {
        if (response) {
          this.municipios = response.datos.rows;
        }
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
    // this.DataService.get(`centralizador/gestion/detalle/listar_regularizado?gestion=${this.id_gestion.id_gestion}`)
    this.DataService.get(`centralizador/gestion/detalle/listar_acumulado?gestion=${this.id_gestion.id_gestion}`)
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
}

export default ListadoBonoRegularizado;