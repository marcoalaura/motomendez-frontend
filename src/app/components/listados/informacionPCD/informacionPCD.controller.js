'use strict';
import modalController from './editarPcdModal.controller.js';
import modalTemplate from './editarPcdModal.html';
import modalControllerInactivar from './inactivarPcdModal.controller.js';
import modalTemplateInactivar from './inactivarPcdModal.html';

class informacionPCD {
  constructor ($location, DataService, Message, Modal, $log, $scope, Storage, NgTableParams) {
    'ngInject';
    this.$location = $location;
    this.DataService = DataService;
    this.Message = Message;
    this.Modal = Modal;
    this.datos = [];
    this.$log = $log;
    this.$scope = $scope;
    this.$scope.oneAtATime = true;
    this.Storage = Storage;
    this.NgTableParams = NgTableParams;
  }

  $onInit () {
    this.rol = this.Storage.getUser().rol;
  }
  buscar () {
    this.$log.log(this.cedula_identidad);
    this.datos = [];
    this.pcd = null;
    this.var = false;
    this.DataService.get(`centralizador/detalle-pcd?documento_identidad=${this.cedula_identidad}`)
      .then(response => {
        // if (response.datos == null) {
        if (response.datos && response.datos.length < 1) {
          this.Message['info']('No existe un registo que coincida con su búsqueda');
        } else {
          response.datos.forEach(item => {
            item.persona.nombre_completo = this.formatoNombre(item.persona);
            this.datos.push(item);
          });
        }
      });
  }

  detalle (item) {
    this.var = true;
    this.pcd = item;
    this.beneficios = null;
    this.mensaje = null;
    this.listarBeneficios(this.pcd.id_pcd);
  }

  listarBeneficios (idPcd) {
    this.tableParams = new this.NgTableParams({
      count: 10
    }, {
      getData: params => {
        let data = params.url();
        let query = {
          id_pcd: idPcd,
          limit: data.count,
          page: data.page
        };
        return this.DataService.list('centralizador/pcd-beneficio', query)
          .then(response => {
            if (response) {
              params.total(response.datos.count);
              this.renderLabels({
                ini: (query.page - 1) * query.limit + 1,
                end: query.page * query.limit < response.datos.count ? query.page * query.limit : response.datos.count,
                total: response.datos.count
              });
              this.beneficios = response.datos.rows;
              return this.beneficios;
            } else {
              this.mensaje = 'No existe registro de beneficios.';
            }
          });
      }
    });
  }
  renderLabels (params) {
    params;
  }

  // Formato del nombre
  formatoNombre (persona) {
    var nombreCompleto;
    if (persona.formato_inf === 'NUAC') {
      nombreCompleto = `${persona.nombres} ${persona.primer_apellido || ''} ${persona.segundo_apellido || ''}`;
    } else {
      if (persona.formato_inf === 'U1AC' && persona.estado_civil === 'C') {
        nombreCompleto = `${persona.nombres} ${persona.primer_apellido || persona.segundo_apellido} de ${persona.casada_apellido || ''}`;
      }
      if (persona.formato_inf === 'U1AC' && persona.estado_civil === 'V') {
        nombreCompleto = `${persona.nombres} ${persona.primer_apellido || persona.segundo_apellido} Vda. de ${persona.casada_apellido || ''}`;
      }
      if (persona.formato_inf === 'UTAC' && persona.estado_civil === 'C') {
        nombreCompleto = `${persona.nombres} ${persona.primer_apellido || ''} ${persona.segundo_apellido || ''} de ${persona.casada_apellido || ''}`;
      }
      if (persona.formato_inf === 'UTAC' && persona.estado_civil === 'V') {
        nombreCompleto = `${persona.nombres} ${persona.primer_apellido || ''} ${persona.segundo_apellido || ''} Vda. de ${persona.casada_apellido || ''}`;
      }
      if (!persona.formato_inf) {
        nombreCompleto = `${persona.nombres} ${persona.primer_apellido || ''} ${persona.segundo_apellido || ''}`;
      }
    }
    return nombreCompleto;
  }

  editar (item) {
    this.Modal.show({
      template: modalTemplate,
      controller: modalController,
      data: item,
      size: 'lg'
    });
  }

  inactivar (item) {
    this.Modal.show({
      template: modalTemplateInactivar,
      controller: modalControllerInactivar,
      data: item,
      size: 'lg'
    });
  }
}

export default informacionPCD;
