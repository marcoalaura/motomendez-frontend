'use strict';

import modalControllerEditarPCD from './editarPCD.controller.js';
import modalTemplateEditarPCD from './editarPCD.html';

class CorteAnual {
  constructor ($location, DataService, Message, Modal, $http, $scope, $log, NgTableParams, $window, $state, Loading, apiUrl, Storage, Datetime) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.$scope = $scope;
    this.$log = $log;
    this.$window = $window;
    this.$state = $state;
    this.Loading = Loading;
    this.apiUrl = apiUrl;
    this.$http = $http;
    this.Storage = Storage;
    this.Datetime = Datetime;
  }

  $onInit () {
    this.listar();
    this.tipos();
    this.estados();
    this.rol = this.Storage.getUser().rol;
    if (this.rol == 'MINISTERIO') {
      this.obtenerEstado();
    }
    this.fecha = new Date();
    this.gestion = this.fecha.getFullYear() + 1;
    this.tipo = this.tipos[0];
  }

  obtenerEstado () {
    this.DataService.get('centralizador/obtener_corte_anual')
      .then(response => {
        if (response) {
          this.estado = response.mensaje;
        }
      })
  }

  tipos () {
    this.tipos = [
      // {tipo: ''},
      {tipo: 'SIPRUNPCD'},
      {tipo: 'IBC'}
    ];
  }

  estados () {
    this.estados = [
      {id: '', estado: 'TODOS'},
      {id: 'HABILITADO', estado: 'SIN OBSERVACION'},
      {id: 'OBSERVADO', estado: 'OBSERVADO'},
      {id: 'PENDIENTE', estado: 'PENDIENTE'}
    ];
  }

  verEditar (pcd, visible) {
    pcd.esEdicion = true;
    pcd.visible = visible;
    this.$log.log(pcd);
    this.Modal.show({
      template: modalTemplateEditarPCD,
      controller: modalControllerEditarPCD,
      data: pcd,
      size: 'lg'
    });
  }

  listar () {
    this.tableParams = new this.NgTableParams({
      count: 10
    }, {
      getData: params => {
        let data = params.url();
        let query = {
          limit: data.count,
          page: data.page,
          documento_identidad: this.documento_identidad ? this.documento_identidad : '',
          primer_apellido: this.primer_apellido ? this.primer_apellido : '',
          segundo_apellido: this.segundo_apellido ? this.segundo_apellido : '',
          nombres: this.nombres ? this.nombres : ''
        };
        let sort = this.getSorting(data);
        if (sort) {
          query.order = sort;
        }
        if (this.tipo && this.tipo.tipo) {
          query.tipo = this.tipo.tipo;
        }
        if (this.estado && this.estado.estado && this.estado.id !== '') {
          query.estado = this.estado.id;
        }
        return this.DataService.list('centralizador/tmp_pcd', query)
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
  renderLabels (params) {
    params;
  }
  getSorting (params) {
    for (let key in params) {
      if (key.indexOf('sorting') != -1) {
        return (params[key] == 'desc' ? "-" : "") + this.removeCorchete(key, 'sorting');
      }
    }
    return null;
  }
  contrastar () {
    this.Modal.confirm('¿Desea realizar la contrastación de datos personales?', () => {
      this.Loading.show(`Realizando el proceso de contrastación<br>Este proceso puede demorar, sea paciente por favor...`, true);
      this.DataService.post('centralizador/contrastar_tmp_pcd')
        .then(response => {
          this.Loading.hide();
          if (response.finalizado) {
            this.Message['info']('Se ha realizado el proceso de contrastación.');
            this.$state.reload();
            return response.datos;
          } else {
            this.Message['error'](response.mensaje);
          }
        }).catch((err) => {
          this.$log.log(err);
        });
    }, null, 'Contrastar datos personales', 'Contrastar', 'Cancelar', 'tasks', 'lg');
  }
  estadoCivil (id) {
    this.estadosCiviles = [
      {id: 'S', val: 'SOLTERO(A)'},
      {id: 'C', val: 'CASADO(A)'},
      {id: 'V', val: 'VIUDO(A)'}
    ];
    if (this.estadosCiviles.find(e => e.id === id)) {
      return this.estadosCiviles.find(e => e.id === id).val;
    } else {
      return id;
    }
  }
  expedido (id) {
    this.expedidos = [
      {id: '1', val: 'CHUQUISACA'},
      {id: '2', val: 'LA PAZ'},
      {id: '3', val: 'COCHABAMBA'},
      {id: '4', val: 'ORURO'},
      {id: '5', val: 'POTOSÍ'},
      {id: '6', val: 'TARIJA'},
      {id: '7', val: 'SANTA CRUZ'},
      {id: '8', val: 'BENI'},
      {id: '9', val: 'PANDO'}
    ];
    if (this.expedidos.find(e => e.id == id)) {
      return this.expedidos.find(e => e.id == id).val;
    } else {
      return id;
    }
  }
}

export default CorteAnual;
