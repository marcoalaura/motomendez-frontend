'use strict';

import ListadoGeneralModule from './listado-general/listado-general.module';
import ListadoBonoModule from './listadoBono/listadoBono.module';
import ListadoBonoRegularizadoModule from './listadoBonoRegularizado/listadoBonoRegularizado.module';
import InformacionPCDComponent from './informacionPCD/informacionPCD.module';
import PersonaComponent from './persona-component/persona.component';
import GenerarListasComponent from './generar_listas/generarListas.module';
import ListadoMunicipio from './listadoMunicipio/listadoMunicipio.module';
import ListadoMesM from './lista-observadosM/listadoObservadosM.module';
import ListadoMesMun from './lista-observadoMun/listadoObservadosMun.module';
import SoporteModule from './soportePCD/soportePCD.module';
import ListadoAnual from './lista-observadoAnual/listadoObservadosAnual.module';
import CambioDomicilioPCDComponent from './cambioDomicilioPCD/cambioDomicilioPCD.module';
import RegCambioDomicilioPCDComponent from './rCambioDomicilioPCD/rCambioDomicilioPCD.module';
import CorteAnualComponent from './corte_anual/corteAnual.module';
import ListadoSiprunIbcComponent from './listadoSiprunIbc/listadoSiprunIbc.module';


const PersonalDiscapacitados = angular
    .module('app.personalDiscapacitados', [
        ListadoGeneralModule,
        ListadoMunicipio,
        ListadoMesM,
        InformacionPCDComponent,
        GenerarListasComponent,
        ListadoMesMun,
        ListadoBonoModule,
        ListadoBonoRegularizadoModule,
        SoporteModule,
        ListadoAnual,
        CambioDomicilioPCDComponent,
        RegCambioDomicilioPCDComponent,
        CorteAnualComponent,
        ListadoSiprunIbcComponent
    ])
    .component('persona', PersonaComponent)
    .name;

export default PersonalDiscapacitados;