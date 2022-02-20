'use strict';

class UserAgregarController {
  constructor($uibModalInstance, data, $log, DataService, Message, $state, $scope, helpLang) {
    'ngInject';
    this.items = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.DataService = DataService;
    this.Message = Message;
    this.$state = $state;
    this.$scope = $scope;
    this.helpLang = helpLang;
  }

  $onInit() {
    this.helpLang.ejemplo = "Para guardar la información del nuevo usuario debe validar los datos buscar su CI y fecha de nacimiento"
    this.departamentosLoad();
    this.tituloPagina = 'Agregar Usuario';
    this.get_rol();
    this.init_provincias = this.provincias;
    this.init_municipios = this.municipios;
    this.usuario = {};
    if (this.items.esEdicion) {
      // realizar la peticion
      this.DataService.get(`usuario/${this.items.id_usuario}`)
      .then(response => {
        this.usuario.email = response.datos.email;
        this.usuario.roles = response.datos.usuarios_roles[0].rol;
        this.usuario.nombres = response.datos.persona.nombre_completo;
        this.id_dpa = {
          cod_departamento: response.datos.dpa.cod_departamento,
          departamento: response.datos.dpa.departamento,
        };
        this.fid_provincia = {
          cod_provincia: response.datos.dpa.cod_provincia,
          provincia: response.datos.dpa.provincia,
        };
        this.usuario.cod_municipio = {
          cod_municipio: response.datos.dpa.cod_municipio,
          municipio: response.datos.dpa.municipio,
        };
      });

      this.tituloPagina = 'Editar Usuario';
      //this.usuario = this.items.usuario;
    }
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
  }
  ok(validador) {
    if (angular.isUndefined(this.usuario)) {
      var type = "warning";
      this.Message[type]("Debe llenar la información del formulario.");
      return;
    }
    
    this.usuario.fid_persona = this.data.usuario.id_persona;
    if (this.items.esEdicion) {
      if (validador.rol.$valid) {
        let modificarUsuario = {
          email: this.usuario.email,
          roles: this.usuario.roles.id_rol,
        };
        if (this.usuario.roles.id_rol === 3) {
          modificarUsuario.cod_municipio = this.usuario.cod_municipio.cod_municipio;
        }
        this.DataService.put('usuario/' + this.items.id_usuario, modificarUsuario)
          .then(response => {
            if (response) {
              this.items.refresh;
              this.$state.reload();
              this.$uibModalInstance.close();
            }
          });
      } else {
        if (!this.usuario.roles) {
          this.Message.error("Debe asignar un rol al usuario")
        }
      }
    } else {
      if (validador.$valid) {
        let nuevoUsuario = {
          email: this.usuario.email,
          fid_persona: this.usuario.fid_persona,
          roles: this.usuario.roles.id_rol,
        };
        if (this.usuario.roles.id_rol == 3) {
          nuevoUsuario.cod_municipio = this.usuario.cod_municipio.cod_municipio;
        }
        this.DataService.post('usuario/', nuevoUsuario)
          .then(response => {
            if (response) {
              this.items.refresh;
              this.$state.reload();
              this.$uibModalInstance.close();
            }
          });
      } else {
        if (!this.usuario.roles) {
          this.Message.error("Debe asignar un rol al usuario")
        } else {
          this.Message.error("Formulario Incompleto. Revice los datos para poder enviarlos")
        }
      }
    }
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
  get_rol() {
    this.DataService.get('rol')
      .then(response => {
        this.roles = response.datos.rows;
        // this.roles = response.datos.rows.splice(0, 4);
        // this.roles = this.roles.splice(1, 4);
      })
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
      delete this.usuario.fid_dpa;
      delete this.fid_provincia;
      delete this.usuario.cod_municipio;
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
      delete this.usuario.fid_dpa;
      delete this.usuario.cod_municipio;
    }
    this.init_municipios = !1;
    this.DataService.get('centralizador/dpa/' + this.id_dpa + '/provincia/' + this.fid_provincia.cod_provincia)
      .then((response) => {
        if (response) {
          this.municipios = response.datos.rows;
        }
      })

  }


}
export default UserAgregarController;