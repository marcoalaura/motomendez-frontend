'use strict';
import modalController from './user.agregar.controller.js';
import modalTemplate from './user.agregar.html';
class UserController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Util, Message) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Util = Util;
    this.Message = Message;
    this.roles = [];
  }

  $onInit() {
    this.url = 'rest/users/';
    this.title = 'Usuario';
    this.cargarUsuarios();
    this.get_rol();
  }
  cargarUsuarios() {
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
        return this.DataService.list("usuario", query)
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
  verEditar(user) {
    user.esEdicion = true;
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: user,
      size: 'lg'
    });
  }
  eliminar(user) {
    this.Modal.confirm('¿Desea eliminar al Usuario ' + user.persona.nombres + ' ' + user.persona.primer_apellido + ' ?', () => {
      this.$log.log('Eliminamos = ', user);
      this.DataService.delete('usuario/' + user.id_usuario)
        .then(() => {
          this.Message.success('Su registro fue eliminado correctamente.');
          this.refresh();
        });
    });
  }
  get_rol() {
    this.DataService.get('rol')
      .then(response => {
        this.roles = response.datos.rows;
      })
  }
  reenviarCorreo(user) {
    this.DataService.get(`usuario/${user.id_usuario}/reenviar_correo`)
      .then(response => {
        this.Message.success('Se reenvio el código de activación.');
        return response;
      })
  }
  add() {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: '',
      size: 'lg'
    });
  }
  refresh() {
    this.cargarUsuarios();
  }
}

export default UserController;