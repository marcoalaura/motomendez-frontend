'use strict';

const CommonConfig = function ($httpProvider, $logProvider, $authProvider, authUrl, searchUrl, appName, DataServiceConfig, uibDatepickerPopupConfig, uibDatepickerConfig, formlyConfigProvider, debug, $compileProvider, cfpLoadingBarProvider) {
  'ngInject';

  // Habilitar los logs del sistema
  $logProvider.debugEnabled(true); 

  // Configurando parametros para autenticación con Satellizer
  // Config url auth
  $authProvider.loginUrl = authUrl;
  // $authProvider.signupUrl = "http://api.com/auth/signup";
  $authProvider.tokenName = "token";
  $authProvider.tokenPrefix = appName;
  // $httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin': '*' };
  // $authProvider.authToken = 'Bearer';

  // Configurando salida de respuesta del rest backend para el DataService
  // DataServiceConfig.filterResponse = function (response, Message) {
  //     if (response.datos) {
  //         response = response.datos;
  //     } else {
  //         if (!response.finalizado) {
  //             Message.error(response.mensaje);
  //             response = response.datos;
  //         }
  //     }
  //     return response;
  // };

  // para que en la descarga de archivo quite el unsafe
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob):/);

  // Configurando datepicker
  uibDatepickerPopupConfig.appendToBody = true;
  uibDatepickerPopupConfig.clearText = 'Limpiar';
  uibDatepickerPopupConfig.closeText = 'Cerrar';
  uibDatepickerPopupConfig.currentText = 'Hoy';
  uibDatepickerPopupConfig.onOpenFocus = false;
  uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
  uibDatepickerConfig.showWeeks = false;

  // Configurando formly
  formlyConfigProvider.setWrapper({
    name: 'validation',
    types: ['input', 'select', 'datepicker', 'textarea'],
    template: `
      <formly-transclude></formly-transclude>
      <div class="form-error" ng-messages="fc.$error" ng-if="form.$submitted || options.formControl.$touched">
        <div ng-message="{{ ::name }}" ng-repeat="(name, message) in ::options.validation.messages" class="message">{{ message(fc.$viewValue, fc.$modelValue, this)}}</div>
      </div>
    `
  });

  // Config loading
  cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div class="loading-container"><span class="loading-text"></span> <span class="spinner-icon"></span></div></div>';
};

export default CommonConfig;