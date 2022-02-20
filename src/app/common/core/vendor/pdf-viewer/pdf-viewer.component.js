'use strict';

import controller from './pdf-viewer.controller';
import template from './pdf-viewer.html';
import './pdf-viewer.scss';

const PdfViewerComponent = {
    bindings: {
      scale: '@',
      page: '@',
      height: '@',
      download: '@',
      print: '@',
      open: '@',
      name: '@',
      base64: '<',
      data: '<',
      url: '@',
      nview: '@'
    },
    controller,
    template
};

export default PdfViewerComponent;
