'use strict';

import config from '../../config.json';

const server = config.server;

const Config = angular
  .module('app.config', [])
  .constant('appName', 'app') // prefijo del sistema para el Storage y Sessiones
  .constant('systemName', 'Plataforma Eustaquio "Moto" Méndez')
  .constant('timeSessionExpired', config.timeSessionExpired) //Tiempo en minutos para que la sesión se cierre automáticamente si existe i$
  .constant('onbeforeunload', config.onbeforeunload)
  .constant('debug', config.debug)
  .constant('PageNoLogin', ['login','confirmar_cuenta', 'restaurar', 'domicilio']) // Rutas que no requieren autenticación
  .constant('searchUrl', `${config.serverAuth}/pcd/`) // URL para buscar informacion sobre PCD
  .constant('authUrl', `${config.serverAuth}/autenticar/`) // URL para autenticacion
  .constant('apiUrl', `${server}/api/v1/`) // Rest principal del sistema
  .constant('baseUrl', `${server}/`) // Ruta base
  .name;

export default Config;
