'use strict';

import modalController from './subirCSV.controller.js';
import modalTemplate from './subirCSV.html';
import modalControllerF from './filtrar.controller.js';
import modalTemplateF from './filtrar.html';
import modalControllerC from './contrastar.controller.js';
import modalTemplateC from './contrastar.html';
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
    // this.estado = this.estados[2];
  }

  obtenerEstado() {
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
      {tipo: 'SIPRUN'},
      {tipo: 'OVT'},
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

  add () {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: '',
      size: 'lg'
    });
  }

  verEditar (pcd) {
    pcd.esEdicion = true;
    this.$log.log(pcd);
    this.Modal.show({
      template: modalTemplateEditarPCD,
      controller: modalControllerEditarPCD,
      data: pcd,
      size: 'xl'
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
        return this.DataService.list('centralizador/listar_corte', query)
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

  descargar() {
    this.Loading.show(`Se prepara la información del corte anual, para ser descargado.`, true);
    this.DataService.file('centralizador/obtener_corte_anual', 'application/csv', { gestion: this.gestion }, true)
    .then(response => {
      this.Loading.hide();
      if (response) {
        const link = document.createElement('a');
        link.href = response;
        link.setAttribute('download', 'reporteCorteAnual.csv');
        document.body.appendChild(link);
        link.click();
      }
    })
  }

  filtrar () {
    this.Modal.show({
      template: modalTemplateF,
      controller: modalControllerF,
      data: '',
      size: 'lg'
    });
  }

  contrastar () {
    this.Modal.show({
      template: modalTemplateC,
      controller: modalControllerC,
      data: '',
      size: 'lg'
    });
  }
}

export default CorteAnual;
