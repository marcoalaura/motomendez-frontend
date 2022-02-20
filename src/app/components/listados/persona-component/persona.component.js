'use strict';

import controller from './persona.controller';

const PersonaComponent = {
  bindings: {
    id: '@',
    label: "@",
    modelPersona: '=',
    tutor: '@',
    discapacitado:'<',
  },
  require: {
    form: '^form'
  },
  template: `
  <div class="my-0">
    <div class="row pl-3 bg-primary text-white pt-2 pb-2" style="border-radius:4px;" ng-if="$ctrl.label">
      <strong>{{$ctrl.label}}</strong>
    </div>
    <div class="row pl-4 pr-4">
      <div class="col-md-4 col-xs-12 col-sm-12">
        <c-input name="cedula_identidad{{$ctrl.id}}" label="Cédula de Identidad" ng-required="true" ng-model="$ctrl.modelPersona.ci" ng-validation="ci"
        ng-maxlength="13" ng-minlength="3"></c-input>
      </div>
      <div class="col-md-4">
        <c-date name="fecha_nacimiento{{$ctrl.id}}" label="Fecha de Nacimiento" ng-required="true" ng-model="$ctrl.modelPersona.fechaNacimiento"></c-date>
        <!--<c-input name="fecha_nacimiento{{$ctrl.id}}" label="Fecha de Nacimiento" ng-required="true" ng-model="$ctrl.modelPersona.fecha_nacimiento"></c-input>-->
      </div>
      <div class="col-md-2 mt-4">
        <!--<button class="btn btn-info py-2 px-3 mt-2" ng-click="$ctrl.validarSEGIP()">
          <i class="fa fa-check-circle" aria-hidden="true"></i>
          VALIDAR
        </button>-->
        <button type="button" class="btn btn-info py-2 px-3 mt-2" ng-disabled="$ctrl.loadingPersona"
        ng-click="$ctrl.validarSEGIP()" button-spinner="$ctrl.loadingPersona" button-prepend="fa fa-check-circle mr-2">Validar</button>
      </div>
    </div>
    <div class="row pl-4 pr-4">
      <div class="col-md-4">
        <c-input name="nombres{{$ctrl.id}}" label="Nombres" ng-required="true" ng-model="$ctrl.modelPersona.nombre" ng-disabled="true"></c-input>
      </div>
      <div class="col-md-4">
        <c-input name="primer_apellido{{$ctrl.id}}" label="Primer Apellido" ng-required="false" ng-model="$ctrl.modelPersona.primerApellido" ng-disabled="true"></c-input>
      </div>
      <div class="col-md-4">
        <c-input name="segundo_apellido{{$ctrl.id}}" label="Segundo Apellido" ng-required="false" ng-model="$ctrl.modelPersona.segundoApellido" ng-disabled="true"></c-input>
    </div>
    </div>
    <div class="row pl-4 pr-4">
      <div class="col-md-4">
        <c-input name="celular{{$ctrl.id}}" label="Teléfono/Celular" ng-required="true" ng-model="$ctrl.modelPersona.telefono" ng-validation="celular" ng-maxlength="12" ng-minlength="5"></c-input>
      </div>
      <div class="col-md-4">
        <c-radiobutton name="genero{{$ctrl.id}}" label="Género" ng-model="$ctrl.modelPersona.genero" options="$ctrl.tipoGenero" field="text" ng-required="true"></c-radiobutton>
      </div>
      <div class="col-md-4" ng-if="$ctrl.tutor=='true'">
        <c-radiobutton name="tiene_tutor" label="Tutor" ng-model="$ctrl.modelPersona.tutor" options="$ctrl.tipoTutor" field="text" ng-required="true"></c-radiobutton>
      </div>
    </div>
  </div>
  `,
  controller
}

export default PersonaComponent;