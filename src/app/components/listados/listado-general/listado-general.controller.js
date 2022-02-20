'use strict';
//import modalControllerActualizar from './asignarTutorModal.controller.js';
//import modalTemplateActualizar from './asignarTutorModal.html';
import modalController from './asignarTutorModal.controller.js';
import modalTemplate from './asignarTutorModal.html';
class ListadoGeneral {
  constructor($location, DataService, Message, Modal, NgTableParams, $log, Storage, $scope) {
    'ngInject';
    //this.ValidationService = ValidationService;
    this.$log = $log;
    this.NgTableParams = NgTableParams;
    this.Storage = Storage;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.rol = this.Storage.getUser().rol;


  }
  $onInit() {
    this.requerido = true;
    this.obtenerlistadoGenral();
    this.departamentosLoad();
    this.init_provincias = this.provincia;
    this.init_municipios = this.municipio;
    this.$scope.$watch('$ctrl.id_dpa', () => {
      if (this.id_dpa) {
        this.provinciasLoad();
      }
    })
    this.$scope.$watch('$ctrl.fid_provincia', () => {
      if (this.fid_provincia) {
        this.municipiosLoad();
      }
    })
    // MENSAJE PARA CAMBIO DE MUNICIPIO
    this.FechaPlazo = new Date('2021-06-30 23:59:59');
    if (new Date().getTime() <= this.FechaPlazo.getTime()) {
      this.Modal.show({
        title: 'Aviso importante',
        //message: '<img width = "100%" src="images/comunicado29.jpg" \>',
        message: 'A partir del 01 de abril al 30 de junio de la presente gestión, se habilita en la plataforma "EUSTAQUIO MOTO MENDEZ", el formulario de cambio de entidad de cobro.',
        labelOk: 'ENTENDIDO',
        cancel: false
      })
    }
    // MENSAJE PARA ACTUALIZACIÓN DE BENEFICIARIOS
    this.plazo = new Date('2020-12-20 23:59:59');
    if (new Date().getTime() <= this.plazo.getTime()) {
      this.Modal.show({
        title: 'Aviso importante',
        message: '<img width = "100%" src="images/comunicado72.jpg" \>',
        labelOk: 'ENTENDIDO',
        cancel: false
      })
    }
    // this.Modal.show({
    //   title: 'Aviso importante',
    //   message: 'EN CUMPLIMIENTO AL <b>COMUNICADO Nro. 32/2019</b> DEL MTEPS LA LISTA DE BENEFICIARIOS DEL BONO MENSUAL DE DISCAPACIDAD, ESTÁ ACTUALIZADA AL 13 DE DICIEMBRE DEL PRESENTE AÑO.',
    //   labelOk: 'ENTENDIDO',
    //   cancel: false
    // })
  }
  obtenerlistadoGenral() {
    this.tableParams = new this.NgTableParams({
      count: 10
    }, {
      getData: params => {
        let data = params.url();
        let query = {
          limit: data.count,
          page: data.page,
        };
        let sort = this.getSorting(data);
        if (sort) {
          query.order = sort;
        }
        this.$log.log('data:', data);
        return this.DataService.list("centralizador/pcd", query)
          .then(response => {
            if (response) {
              params.total(response.datos.count);
              this.renderLabels({
                ini: (query.page - 1) * query.limit + 1,
                end: query.page * query.limit < response.datos.count ? query.page * query.limit : response.datos.count,
                total: response.datos.count
              });
              return response.datos.rows;
            }
          });
      }
    });
  }

  getSorting(params) {
    for (let key in params) {
      if (key.indexOf('sorting') != -1) {
        return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
      }
    }
    return null;
  }
  renderLabels(params) {
    params;
  }


  generar_reporte_lugar(validador) {
    this.$log.log('1.......................', validador);
    if (validador.$valid) {
      this.tableParams = new this.NgTableParams({
        count: 10
      }, {
        getData: params => {
          let data = params.url();
          let query = {
            limit: data.count,
            page: data.page,
          };
          if (this.cod_municipio && this.cod_municipio.cod_municipio) {
            query.codigo_municipio = this.cod_municipio.cod_municipio
          }
          if (this.documento_identidad) {
            query.documento_identidad = this.documento_identidad
          }
          let sort = this.getSorting(data);
          if (sort) {
            query.order = sort;
          }
          this.$log.log('data:', data);
          return this.DataService.list("centralizador/pcd", query)
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
                this.Message.info('No existen datos que coincidan con sus parámetros de búsqueda');
              }
            });
        }
      })
    } else {
      this.Message.warning('Complete todos los campos para iniciar una búsqueda');
    }
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

  provinciasLoad() {
    this.provincias = [];
    this.municipios = [];
    if (!this.init_provincias) {
     // delete this.cod_municipio;
      delete this.fid_provincia;
      delete this.cod_municipio;
    }
    this.init_provincias = !1;

    this.DataService.get(`centralizador/dpa/` + this.id_dpa.cod_departamento)
      .then((response) => {
        if (response) {
          this.provincias = response.datos.rows;
        }
      })
  }

  municipiosLoad() {

    this.municipios = [];
    if (!this.init_municipios) {
     // delete this.fid_provincia
      delete this.cod_municipio;
     // delete this.usuario.cod_municipio;
    }
    this.init_municipios = !1;
    this.DataService.get('centralizador/dpa/' + this.id_dpa + '/provincia/' + this.fid_provincia.cod_provincia)
      .then((response) => {
        if (response) {
          this.municipios = response.datos.rows;
        }
      })

  }
  asignar(user) {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: user,
      size: 'lg'
    });
  }


  mostrar_pdf() {
    this.Modal.pdf({
      //url: restUrlv2 + 'proyectos/' + proyecto.id_proyecto + '/transiciones/' + proyecto.transicionActual.id_transicion + '/pdf',
      //title: proyecto.titulo
    })
  }

  eliminar(user) {

    this.Modal.confirm('¿Desea eliminar al Tutor de ' + user.persona.nombres + ' ?', () => {
      this.$log.log('Eliminamos = ', user);
      this.DataService.delete('usuario/' + user.id_usuario)
        .then(() => {
          this.Message.success('Su registro fue eliminado correctamente.');
          this.refresh();
        });
    });
    //this.DataService.delete(`centralizador/pcd/${user.id_usuario}`/)
  }
  /**
   * obtenerEmpleadosActivos - Método para obtener la lista de empleados ACTIVOS
   

  cancelar() {
    this.mostrarPersonalDiscapacidad = false;
    this.mostrarPersonalTutor = false;
    this.empleado = {};
    this.empleado.tutor = 'Si';
    this.relacion = {};
    this.relaciones = [];
  }*/
}

export default ListadoGeneral;