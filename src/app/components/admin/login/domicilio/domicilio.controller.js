'use strict';

class DomicilioController {
  constructor($scope, $rootScope, Storage, Message, timeSessionExpired, SidenavFactory, $log, $location, Modal, DataService, Datetime, baseUrl) {
    'ngInject';

    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.Storage = Storage;
    this.Message = Message;
    this.timeSessionExpired = timeSessionExpired;
    this.SidenavFactory = SidenavFactory;
    this.$log = $log;
    this.$location = $location;
    this.Modal = Modal;
    this.DataService = DataService;
    this.Datetime = Datetime;
    this.baseUrl = baseUrl;
}

  $onInit() {
    this.departamentosLoad();
    this.init_provincias = this.provincias;
    this.init_municipios = this.municipios;

    this.departamento = null;
    this.provincia = null;
    this.municipio = null;
    this.direccion = '';
    this.ci_solicitante = '';
    this.solicitante = '';
    this.permitido = false;
    this.tamanio_permitido = true;
    this.pcd = {
      documento_identidad: '',
      fecha_nacimiento: null,
      cod_municipio: null,
      direccion: '',
      documento_siprun: null,
      ci_solicitante: '',
      solicitante: ''
    }
    this.actualizado = [{
      id: 1,
      nombre: 'Si',
    }, {
      id: 2,
      nombre: 'No',
    }]
    this.extensiones_permitidas = new Array("image/png", "image/jpg", "image/jpeg", "application/pdf");
    this.datosPcd = this.SidenavFactory.getDatosPcd();

    // Si no existe información redireccionamos al inicio
    // if (this.datosPcd.numero_documentoss) {
    if (!this.datosPcd.numero_documento) {
      this.$location.path('/');
    } else {
      this.datosPcd.fecha_nac = this.Datetime.format(this.datosPcd.fecha_nacimiento,'dd/MM/YYYY')

      this.tituloPagina = 'Declaración jurada de cambio de municipio de persona con discapacidad';
      // this.obterner_parametros()
      // Si no recupera información redirecciona
      this.$scope.$watch('$ctrl.departamento', () => {
        if (this.departamento) {
          this.provinciasLoad();
        }
      })
      this.$scope.$watch('$ctrl.provincia', ()=>{
        if (this.provincia) {
          this.municipiosLoad();
        }
      })
    }
  }
  ok(form) {
    if (angular.isUndefined(this.municipio)  || !this.municipio) {
      this.Message["warning"]("Debe llenar la información del Municipio del nuevo domicilio.");
      return;
    } 

    if (angular.isUndefined(this.direccion)  || !this.direccion) {
      this.Message["warning"]("Debe ingresar la información de la dirección del beneficiario.");
      return;
    } 

    if (!((!this.solicitante && !this.ci_solicitante) || (this.solicitante && this.ci_solicitante))) {
      this.Message["warning"]("Debe completar los datos de la persona o apoderado solicitante.");
      return;
    } 

    if (this.fileBase64) {
      for (var i = 0; i < this.extensiones_permitidas.length; i++) {
        this.permitido = false;
        if (this.extensiones_permitidas[i] == this.fileBase64.type) {
          this.permitido = true;
          break;
        }
      }
      if (this.fileBase64.size > 5000000) {
        this.tamanio_permitido = false;
      } else {
        this.tamanio_permitido = true;
      }
    } else {
      this.Message["warning"]("Debe subir el archivo del carnet de discapacidad firmado o con la huella dactilar del beneficiario.");
      return;
    }
    
    if (form.$valid) {
      if ((this.permitido == false || this.tamanio_permitido == false) && this.fileBase64) {
        if (this.permitido == false) {
          this.Message["warning"]("El formato de archivo no es válido, el sistema solo acepta pdf's, jpg's y png's.");
        } else if (this.tamanio_permitido == false) {
          this.Message["warning"]("El tamaño del archivo adjunto supera el límite permitido.");
        } else {
          this.Message["warning"]("falta completar la información del formulario.");
        }
      } else {
        this.Modal.confirm('¿Está seguro de realizar el cambio de domicilio al municipio de <b>' + this.municipio.municipio + '</b>?<br> Recuerde que esta operación del cambio solo se permite una sola vez en la gestión.', () => {
          this.pcd.documento_identidad = this.datosPcd.numero_documento;
          this.pcd.fecha_nacimiento = this.datosPcd.fecha_nacimiento;
          this.pcd.cod_municipio = this.municipio.cod_municipio;
          this.pcd.direccion = this.direccion;
          this.pcd.ci_solicitante = this.ci_solicitante;
          this.pcd.solicitante = this.solicitante;
          if (this.fileBase64) {
            this.pcd.documento_siprun = this.fileBase64.data;
          }

          this.DataService.post(`${this.baseUrl}registrar/`, this.pcd)
          .then(response => {
            if (response) {
              this.$log.log('Respuesta a***= ', response);
              this.Message.success('Cambio de municipio registrado exitosamente.');
              this.datosPcd = {};
              this.SidenavFactory.setDatosPcd(this.datosPcd);
              this.$location.path('/');
            }
          }).catch(error => {
            this.datosPcd = {};
            this.SidenavFactory.setDatosPcd(this.datosPcd);
            this.msgError(error)
          });
        });
      }
    } else {
      this.Message.warning("Datos incorrectos, revise el formulario antes de enviarlo");
    }


  }
  obterner_parametros() {
    this.DataService.get('centralizador/parametro?grupo=PARENTESCO')
      .then(response => {
        if (response) {
          this.parentesco = response.datos.rows;
        }
      });
  }
  departamentosLoad () {
    this.departamentos = [];
    this.provincias = [];
    this.municipios = [];

    this.DataService.searchUrl_(`${this.baseUrl}centralizador/dpa`)
    .then( (response) => {
      if (response) {
        this.departamentos = response.datos.rows;
      }
    })
  }

  provinciasLoad () {
    this.provincias = [];
    this.municipios = [];
    if (!this.init_provincias) {
      delete this.provincia;
      delete this.municipio;
    }
    this.init_provincias = !1;

    this.DataService.searchUrl_(`${this.baseUrl}centralizador/dpa/`+this.departamento.cod_departamento)
    .then( (response) => {
      if (response) {
        this.provincias = response.datos.rows;
      }
    })
  }

  municipiosLoad () {
    this.municipios = [];
    if (!this.init_municipios) {
      delete this.municipio;
    }
    this.init_municipios = !1;
    this.DataService.searchUrl_(`${this.baseUrl}centralizador/dpa/`+ this.departamento.cod_departamento +'/provincia/'+this.provincia.cod_provincia)
    .then( (response) => {
      if (response) {
        this.municipios = response.datos.rows;
      }
    })

  }
  cancel() {
    this.datosPcd = {};
    this.SidenavFactory.setDatosPcd(this.datosPcd);
    this.$location.path('/');
  }
  
}
export default DomicilioController;