'use strict';
class rCambioDomicilioPCD {
  constructor($scope, $rootScope, Storage, Message, timeSessionExpired, SidenavFactory, $log, $location, Modal, DataService, Datetime, baseUrl) {
    'ngInject';
    //this.ValidationService = ValidationService;
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
    this.ci_pcd = '';
    this.encontrado = false;
    this.acepto = false;
    this.nombre_municipio = '';
    this.municipio = '';
    this.cod_rol_municipio = '';
    this.Realizado = false;
    this.pcd = {
      documento_identidad: '',
      fecha_nacimiento: null,
      cod_municipio: null,
      direccion: '',
      documento_siprun: null,
      ci_solicitante: '',
      solicitante: '',
    }
    this.actualizado = [{
      id: 1,
      nombre: 'Si',
    }, {
      id: 2,
      nombre: 'No',
    }]
    this.extensiones_permitidas = new Array("image/png", "image/jpg", "image/jpeg", "application/pdf");
    this.datosPcd = {};

    this.tituloPagina = 'Formulario Declaración Jurada ­ Cambio de entidad de cobro';

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
    // COMPROBAMOS EL ROL DEL USUARIO PARA BLOQUEAR LA SELECCION DE MUNICIPIO
    if (this.SidenavFactory.getUser().rol === 'MUNICIPIO') {
      this.nombre_municipio = this.SidenavFactory.getUser().municipio;
      this.cod_rol_municipio = this.SidenavFactory.getUser().dpa;
    }
    // Para el control de la vigencia de la operacion
    this.FechaActualCliente = new Date();
    // this.FechaPlazo = new Date(this.FechaActualCliente.getFullYear() +'-06-20 23:59:59');
    this.FechaInicio = new Date(this.FechaActualCliente.getFullYear() +'-04-01 00:00:00');
    this.FechaPlazo = new Date(this.FechaActualCliente.getFullYear() +'-06-30 23:59:59');
    this.Vigencia = this.FechaActualCliente.getTime() <= this.FechaPlazo.getTime() && this.FechaActualCliente.getTime() >= this.FechaInicio.getTime() ? true : false;
  }

  buscarPCD() {
    this.$log.log(this.ci_pcd);
    this.DataService.get(`centralizador/detalle-pcd?documento_identidad=${this.ci_pcd}`)
      .then(response => {
        // if (response.datos == null) {
        if (response.datos.length === 0) {
          this.Message['info']("No existe el registo del PCD");
        // } else {
        } else if (response.datos.length === 1) {
          // this.datosPcd = response.datos;
          this.datosPcd = response.datos[0];
          this.encontrado = true;
          // Formato del nombre
          if (this.datosPcd.persona.formato_inf === 'NUAC') {
            this.datosPcd.nombre_completo = `${this.datosPcd.persona.nombres} ${this.datosPcd.persona.primer_apellido || ''} ${this.datosPcd.persona.segundo_apellido || ''}`;
          } else {
            if (this.datosPcd.persona.formato_inf === 'U1AC' && this.datosPcd.persona.estado_civil === 'C') {
              this.datosPcd.nombre_completo = `${this.datosPcd.persona.nombres} ${this.datosPcd.persona.primer_apellido || this.datosPcd.persona.segundo_apellido} de ${this.datosPcd.persona.casada_apellido || ''}`;
            }
            if (this.datosPcd.persona.formato_inf === 'U1AC' && this.datosPcd.persona.estado_civil === 'V') {
              this.datosPcd.nombre_completo = `${this.datosPcd.persona.nombres} ${this.datosPcd.persona.primer_apellido || this.datosPcd.persona.segundo_apellido} Vda. de ${this.datosPcd.persona.casada_apellido || ''}`;
            }
            if (this.datosPcd.persona.formato_inf === 'UTAC' && this.datosPcd.persona.estado_civil === 'C') {
              this.datosPcd.nombre_completo = `${this.datosPcd.persona.nombres} ${this.datosPcd.persona.primer_apellido || ''} ${this.datosPcd.persona.segundo_apellido || ''} de ${this.datosPcd.persona.casada_apellido || ''}`;
            }
            if (this.datosPcd.persona.formato_inf === 'UTAC' && this.datosPcd.persona.estado_civil === 'V') {
              this.datosPcd.nombre_completo = `${this.datosPcd.persona.nombres} ${this.datosPcd.persona.primer_apellido || ''} ${this.datosPcd.persona.segundo_apellido || ''} Vda. de ${this.datosPcd.persona.casada_apellido || ''}`;
            }
          }
          this.datosPcd.fecha_nac = this.Datetime.format(this.datosPcd.persona.fecha_nacimiento,'dd/MM/YYYY')
        } else {
          this.Message['info']("Se encontró mas de un registro.");
        }
      });
  }

  ok(form) {
    if (angular.isUndefined(this.datosPcd.persona)  || !this.datosPcd.persona) {
      this.Message["warning"]("Debe consultar un documento de identidad de la persona con discapacidad.");
      return;
    }

    if (angular.isUndefined(this.municipio)  || !this.municipio) {
      if (angular.isUndefined(this.cod_rol_municipio)  || !this.cod_rol_municipio) {
        this.Message["warning"]("Debe llenar la información del Municipio del nuevo domicilio.");
        return;
      }
    } 

    if (angular.isUndefined(this.direccion)  || !this.direccion) {
      this.Message["warning"]("Debe ingresar la información de la dirección del beneficiario.");
      return;
    } 
    
    if (form.$valid) {
        this.Modal.confirm('¿Está seguro de realizar el cambio de domicilio al municipio de <b>' + (this.municipio.municipio ? this.municipio.municipio : this.nombre_municipio) + '</b>?<br> Recuerde que esta operación del cambio solo se permite una sola vez en la gestión.', () => {
        this.pcd.documento_identidad = this.datosPcd.persona.documento_identidad;
        this.pcd.fecha_nacimiento = this.datosPcd.persona.fecha_nacimiento;
        this.pcd.cod_municipio = this.municipio.cod_municipio ? this.municipio.cod_municipio : this.cod_rol_municipio;
        this.pcd.direccion = this.direccion;
        this.pcd.ci_solicitante = '';
        this.pcd.solicitante = this.SidenavFactory.getUser().usuario;

        this.DataService.post(`${this.baseUrl}registrar/`, this.pcd)
        .then(response => {
          if (response) {
            this.$log.log('Respuesta a***= ', response);
            this.Message.success('Cambio de municipio registrado exitosamente.');
            this.Realizado = true;
            // this.$location.path('/reg_cambio_municipio');
          }
        }).catch(error => {
          this.datosPcd = {};
          this.cancel();
          this.msgError(error)
        });
      });
    } else {
      this.Message.warning("Datos incorrectos, revise el formulario antes de enviarlo");
    }
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
    this.ci_pcd = '';
    this.direccion = '';
    this.municipio = '';
    this.provincia = '';
    this.departamento = '';
    this.encontrado = false;
    this.Realizado = false;
    this.acepto = false;
  }

  terminar() {
    this.cancel();
    this.$location.path('/reg_cambio_municipio');
  }
}

export default rCambioDomicilioPCD;
