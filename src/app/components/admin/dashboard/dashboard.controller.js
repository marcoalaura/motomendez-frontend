'use strict';

import modalController from './dashboard.modal.controller.js';
import modalTemplate from './dashboard.modal.html';

class DashboardController {
  constructor(apiUrl, Message, Modal, Loading, $log, helpLang) {
    'ngInject';

    this.dt = new Date();
    this.Message = Message;
    this.Modal = Modal;
    this.apiUrl = apiUrl;
    this.Loading = Loading;
    this.helpLang = helpLang;
    this.$log = $log;
  }

  $onInit() {
    this.items = [
      {value: 1, text: 'Item uno'},
      {value: 2, text: 'Item dos'},
      {value: 3, text: 'Item tres'},
      {value: 4, text: 'Item cuatro'},
      {value: 5, text: 'Item cinco'}
    ];

    // Configuración para el datepicker
    this.dateOptions = {
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    // Configuración para el timepicker
    this.mytime = new Date();

    // Configuración para los tabs
    this.tabs = [
      { title:'Título dinámico 1', content:'Contenido dinámico 1' },
      { title:'Título dinámico 2', content:'Contenido dinámico 2', disabled: true }
    ];

    // Configuraciones del file upload
    this.upload = {
      url: 'http://posttestserver.com/post.php', // Url donde se subirá el archivo
      onCompleteItem: (fileItem, response, status, headers) => {
        // Acción con la que se indica que se hará después de subir el archivo
        this.$log('file upload', fileItem, response, status, headers);
      },
      onCompleteAll: () => {
        // Acción con la que se indica que se hará después de subir todos los archivos
      },
      onAfterAddingFile: (fileItem) => {
        this.$log('fileItem', fileItem);
        // Acción con la que se indica que se hará después de agregar el archivo a la lista de archivos por subir
      },
      onBeforeUploadItem: (item) => {
        this.$log('item', item);
        // Acción con la que se indica que se hará antes de subir el archivo
      }
    }
  }

  // Modales de ejemplo
  openModal(size = '') {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: this.items,
      size
    });
  }

  openMessage(type) {
    this.Message[type]();
  }

  openAlert() {
    this.Modal.alert('¡Hola mundo!');
  }

  openConfirm() {
    this.Modal.confirm('¿Está seguro de continuar?', () => {
      this.Modal.alert("Hola!!!");
    });
  }

  // Loading bar
  loadingInit () {
    this.Loading.show();
  }

  loadingInitText () {
    this.Loading.show('Mensaje personalizado de carga');
  }

  loadingInitLocked () {
    this.Loading.show('Mensaje en pantalla completa', true);

    // Forzamos a terminar el loading, por defecto se cierra automáticamente cuando termina la petición
    setTimeout( () => this.Loading.hide(), 3000);
  }

  loadingEnd () {
    this.Loading.hide();
  }
}

export default DashboardController;