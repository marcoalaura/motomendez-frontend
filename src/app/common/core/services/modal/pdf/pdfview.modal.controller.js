'use strict';
class PdfViewModalController {
  constructor($uibModalInstance, data, $sce, DataService, $log) {
    'ngInject';

    this.item = data;
    this.$uibModalInstance = $uibModalInstance;
    this.$sce = $sce;
    this.DataService = DataService;
    this.$log = $log;
  }

  $onInit() {
    this.DataService.pdf(this.item.urlPdf.url, {}).then((response) => {
      this.$log.log('Documento PDF = ', response);
      if (response) {
        this.urlPdf = response;
      }
    });
  }

  ok() {
    this.$uibModalInstance.close(/*Algun valor*/);
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default PdfViewModalController;