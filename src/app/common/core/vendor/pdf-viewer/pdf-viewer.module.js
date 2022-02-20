'use strict';

import PdfViewerComponent from './pdf-viewer.component';
import { NgPdf } from './sayanee/angular-pdf.directive'

const PdfViewerModule = angular
    .module('app.pdf-viewer', [])
    .component('pdfViewer', PdfViewerComponent)
    .directive('ngPdf', NgPdf)
    .name;

export default PdfViewerModule;
