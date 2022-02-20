'use strict';

class LoginController {

    constructor($rootScope, Storage, Message, timeSessionExpired, Auth, SidenavFactory, $log, $location, Modal, DataService, Datetime) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.Storage = Storage;
        this.Message = Message;
        this.Auth = Auth;
        this.timeSessionExpired = timeSessionExpired;
        this.SidenavFactory = SidenavFactory;
        this.$log = $log;
        this.$location = $location;
        this.Modal = Modal;
        this.DataService = DataService;
        this.Datetime = Datetime;
    }

    $onInit() {
        this.tamanio = 1;

        // Para el control de la vigencia de la operacion
        this.FechaPlazo = new Date('2018-06-30 23:59:59');
        this.FechaActualCliente = new Date();
        this.FechaVigenteCliente = this.FechaActualCliente.getTime() <= this.FechaPlazo.getTime() ? true : false;
        
        this.confirmar_cuenta()
        this.$rootScope.auth = false;
        if (this.Storage.exist('expired')) {
            this.Message.warning('Su sesión ha sido cerrada automáticamente después de ' + this.timeSessionExpired + ' minutos de inactividad.', null, 0);
            this.Storage.destroy('expired');
        }
        if (this.Storage.exist('menu') && this.Storage.existUser() && this.Storage.exist('token') && this.Storage.getUser().estado == 'ACTIVO') {
            this.$rootScope.auth = true;
            this.$location.path(this.Storage.getUser().pathInicio);
        }
        this.datosPcd = {};
        // MENSAJE UTILIZADO PARA ACLARAR LO DEL RETROACTIVO
        // this.Modal.show({
            // title: 'COMUNICADO',
            // message: 'La Dirección General de Trabajo, Higiene y Seguridad Ocupacional del Ministerio de Trabajo, Empleo y Previsión Social, comunica que mediante la Plataforma Plurinacional de Información de Personas con Discapacidad "Eustaquio Moto Méndez": <br> A partir de la fecha, se puede acceder al listado de personas que regularizaron sus datos y se encuentran habilitadas para cobrar el bono de meses anteriores. <br><br> La Paz, abril de 2018.',
            // message: '<img width = "100%" src=" " \>',
            // labelOk: 'entendido',
            // cancel: false
        // })
    }
    search(form) {
        this.datosPcd = {};
        this.DataService.searchUrl_(`${this.ci}?fecha_nacimiento=${this.Datetime.format(this.fechaNacimiento,'dd/MM/YYYY')}`)
            .then(respuesta => {
                this.$log.log('1......................', respuesta);
                
                if (respuesta && respuesta.datos && respuesta.datos.encontrado) {
                    this.datosPcd = respuesta.datos;
                    
                    // this.datosPcd.numero_documento = this.ci;
                    // Maneja el plazo para el registro
                    this.FechaActual = new Date(this.datosPcd.fecha);
                    this.FechaVigente = this.FechaActual.getTime() <= this.FechaPlazo.getTime() ? true : false;

                    if (this.datosPcd.datos_mes && this.datosPcd.datos_mes.length >= 12) {     // Cuando estamos en diciembre se oculta el resto de los menes
                        while (this.datosPcd.datos_mes.length > 1)
                            this.datosPcd.datos_mes.shift();
                    } 
                }
                this.ci = null;
                this.nombres = null;
                this.primerApellido = null;
                this.segundoApellido = null;
                this.fechaNacimiento = null;
                this.datos_prueba = true;
                form.$setPristine();
                form.$setUntouched();
            });
       /*  const res = {
            "finalizado": true,
            "mensaje": "Datos obtenidos exitosamente",
            "datos": {
                "numero_documento": "2869319",
                "nombre_completo": "GLOBIS NICETO HERBAS TORRICO",
                "fecha_nacimiento": "1966-10-16T04:00:00.000Z",
                "departamento": "Cochabamba",
                "provincia": "Cercado",
                "municipio": "Cochabamba",
                "observacion": false,
                "mensaje_observacion": null,
                "datos_mes": [
                    {
                        "observacion": null,
                        "estado": "REGISTRADO_SIGEP",
                        "fid_gestion": 2018,
                        "fid_mes": 1
                    }
                ]
            }
        };
        this.datosPcd = res.datos;   */      
    }
    busquedaAvanzada(form) {
        this.datosPcd = {};
        this.DataService.searchUrl_(`${0}?fecha_nacimiento=${this.Datetime.format(this.fechaNacimiento,'dd/MM/YYYY')}&nombres=${this.nombres}&primer_apellido=${this.primerApellido || ''}&segundo_apellido=${this.segundoApellido || ''}`)
            .then(respuesta => {
                if (respuesta && respuesta.finalizado) {
                    this.datosPcd = respuesta.datos;

                    // Maneja el plazo para el registro
                    this.FechaActual = new Date(this.datosPcd.fecha);
                    this.FechaVigente = this.FechaActual.getTime() <= this.FechaPlazo.getTime() ? true : false;
                }
                this.datos_prueba = true;
                this.nombres = null;
                this.primerApellido = null;
                this.segundoApellido = null;
                this.fechaNacimiento = null;
                form.$setPristine();
                form.$setUntouched();
            });
    }
    login() {
        this.documento_identidad = null;
        this.fecha_nacimiento = null;
        this.datos_prueba = false;
    }
    actualizar_domicilio() {
        this.dato = {id: 10};
        this.SidenavFactory.setDatosPcd(this.datosPcd);
        this.documento_identidad = null;
        this.fecha_nacimiento = null;
        this.datos_prueba = true;
        this.$location.path('domicilio');
    }
    signin() {
        this.Auth.signin({
            username: this.username,
            password: this.password,
            path: 'listado_general', // Indica donde se redireccionará cuando se haya iniciado sesión (Opcional, por defecto es 'dashboard')
            pathLogin: 'login', // Indica donde tiene que redireccionará cuando se haya cerrado sesión (Opcional, por defecto es 'login')
            menu: true, // Indica si será visible el Menú de opciones cuando se inicie sesión (Opcional, por defecto es true)
            sidenav: true // Indica si será visible el Sidenav cuando se inicie sesión (Opcional, por defecto es true)
        });


    }

    confirmar_cuenta() {
        if (this.Storage.existUser()) {
            this.$location.path("/" + this.Storage.getUser().pathInicio);
        }
    }

    recovery() {
        this.flip = true;
    }

    goLogin() {
        this.flip = false;
    }

    restaurar() {
        this.$location.path('restaurar');
    }
}

export default LoginController;