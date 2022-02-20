'use strict';

// import modalControllerC from './registro.artesano.modal.controller.js';
// import modalTemplateC from './registro.artesano.modal.html';

class ConfirmarController {
  constructor(NgTableParams, $log, Modal, Storage, DataService, Auth, $location, Util, Message, authUrl,  $http, Sidenav, baseUrl, $stateParams) {
    'ngInject';
    this.NgTableParams = NgTableParams;
    this.$log = $log;
    this.Modal = Modal;
    this.Storage = Storage;
    this.DataService = DataService;
    this.Auth = Auth;
    this.$location = $location;
    this.Util = Util;
    this.Message = Message;
    this.$http = $http;
    this.baseUrl = baseUrl;
    this.Sidenav = Sidenav;
    this.$stateParams=$stateParams;
  
  }

  $onInit() {
    this.titulo = 'Nombre de página';
    this.isContrasenaMinor = true;

    //has-value has-success has-warning
    this.cssInput = 'has-value';
    this.cantidadCaracteres = 8;


  }

  cleanEstiloGenero() {
    this.isGeneroOk = true;
  }


  actualizarContrasena() {
    this.$log.log('actualizamos contrasena:');
    var obj = {
      "usuario": this.usuario.email,
      "contrasena": this.usuario.contrasena,
      "codigo_contrasena":this.$stateParams.codigo
    };
    
    this.$log.log('Objeto para actualizar:', obj);
    this.DataService.put(this.baseUrl+'activar', obj)
    .then(response => {
      if (response) {
        this.$log.log('respuesta del put:', response);
        this.usuariologin = {};
        this.usuariologin.usuario = this.nombreUsuario;
        this.usuariologin.email = response.email;

        this.usuariologin.path = '/',

        this.usuariologin.menu = false,
        this.usuariologin.sidenav = false,
        this.usuariologin.contrasena = this.usuario.contrasena
        var type = "success";
        this.Message[type]("Cuenta Activada Correctamente");
        this.$log.log('enviaando a autenticacion: ', this.usuariologin);
        this.$location.path("/login")
      }
    });

  }

}
export default ConfirmarController;
