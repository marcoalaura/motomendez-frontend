'use strict';

class PdfViewerController {

  constructor($q, $scope, $http, Storage) {
    'ngInject';

    this.defer = $q.defer();
    this.$scope = $scope;
    this.$http = $http;
    this.Storage = Storage;
  }

  $onInit () {
    if(this.base64) {
      this.pdfBase64 = this.base64;
    }
  }
  $onChanges() {
    if(this.data) {
      if(this.data.method == 'POST') {
        let config = {
          responseType: 'arraybuffer'
        }
        if(this.Storage.get('token')) {
          config.headers = {
            'Authorization': this.Storage.get('token')
          }
        }
        this.data.urlDownload = this.data.url;
        this.$http.post(this.data.urlDownload, {}, config).then(resp => {
          if (resp && resp.data) {
            let file = new window.Blob([resp.data], { type: 'application/pdf' });
            this.data.url = window.URL.createObjectURL(file);
            this.pdfUrl = this.data;
          }
        }).catch(() => { });
      } else {
        this.pdfUrl = this.data;
      }
    }
    this.$scope.$watch(() => {
      this.heightPdfContainer = parseInt(this.height, 10) - 32 + 'px';
      angular.element(document.querySelectorAll('.ng-pdf-container')).css('height', this.heightPdfContainer);
    });
  }

}

export default PdfViewerController;
