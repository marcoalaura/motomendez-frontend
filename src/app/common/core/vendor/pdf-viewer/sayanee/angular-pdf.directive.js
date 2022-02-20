
/**
 * Thanks to:
 * https://github.com/sayanee/angularjs-pdf
 */
import template from './viewer.html';

export const NgPdf = ($window, $document, $http, $log, $sce, $timeout, $compile) => {
  'ngInject';

  const backingScale = canvas => {
    const ctx = canvas.getContext('2d');
    const dpr = $window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
  };

  const setCanvasDimensions = (canvas, w, h) => {
    const ratio = backingScale(canvas);
    canvas.width = Math.floor(w * ratio);
    canvas.height = Math.floor(h * ratio);
    canvas.style.width = `${Math.floor(w)}px`;
    canvas.style.height = `${Math.floor(h)}px`;
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
  };

  const initCanvas = (element, canvas, nview) => {
    let divCanvas = $document[0].querySelector('#pdf' + nview)? $document[0].querySelector('#pdf' + nview): $document[0].createElement('div');
    angular.element(divCanvas).addClass('ng-pdf-container');
    angular.element(divCanvas).id = 'pdf' + nview;
    angular.element(divCanvas).attr('id', 'pdf' + nview); 
    angular.element(canvas).addClass('rotate0');
    angular.element(divCanvas).append(canvas);
    element.append(divCanvas);
  };

  return {
    restrict: 'E',
    template: template,
    scope: {
      data: '<',
      data64: '<',
      nview : '@',
    },
    // templateUrl(element, attr) {
    //   return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html';
    // },
    link(scope, element, attrs) {
      let renderTask = null;
      let pdfLoaderTask = null;
      let debug = false;
      let url = scope.pdfUrl;
      let httpHeaders = scope.httpHeaders;
      let pdfDoc = null;
      let pageToDisplay = isFinite(attrs.page) ? parseInt(attrs.page) : 1;
      let pageFit = attrs.scale === 'page-fit';
      let limitHeight = attrs.limitcanvasheight === '1';
      let scale = attrs.scale > 0 ? attrs.scale : 1;
      let canvas = []; //$document[0].createElement('canvas');
      //let canvas = $document[0].createElement('canvas');
      //initCanvas(element, canvas);
      let creds = attrs.usecredentials;
      debug = attrs.hasOwnProperty('debug') ? attrs.debug : false;

      let ctx = [];
      // let ctx = canvas.getContext('2d');
      let windowEl = angular.element($window);

      scope.download = (attrs.download=='true')?true:false;
      scope.print = (attrs.print=='true')?true:false;
      scope.name = (attrs.name)?attrs.name:'documento.pdf';

      element.css('display', 'block');

      windowEl.on('scroll', () => {
        scope.$apply(() => {
          scope.scroll = windowEl[0].scrollY;
        });
      });

      PDFJS.disableWorker = true;
      scope.pageNum = pageToDisplay;

      scope.renderPage = num => {
        if (renderTask) {
          renderTask._internalRenderTask.cancel();
        }

        pdfDoc.getPage(num).then(page => {
          let viewport;
          let pageWidthScale;
          let renderContext;

          if (pageFit) {
            viewport = page.getViewport(1);
            const clientRect = element[0].getBoundingClientRect();
            pageWidthScale = (clientRect.width / viewport.width) - 0.1;
            if (limitHeight) {
              pageWidthScale = Math.min(pageWidthScale, clientRect.height / viewport.height);
            }
            scale = pageWidthScale;
          }
          viewport = page.getViewport(scale);

          setCanvasDimensions(canvas[num-1], viewport.width, viewport.height);

          renderContext = {
            canvasContext: ctx[num-1],
            viewport
          };

          renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            if (angular.isFunction(scope.onPageRender)) {
              scope.onPageRender();
            }
          }).catch(reason => {
            $log.log(reason);
          });
        });
      };

      scope.goPrevious = () => {
        if (scope.pageToDisplay <= 1) {
          return;
        }
        scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
        scope.pageNum = scope.pageToDisplay;
      };

      scope.goNext = () => {
        if (scope.pageToDisplay >= pdfDoc.numPages) {
          return;
        }
        scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
        scope.pageNum = scope.pageToDisplay;
      };

      scope.zoomIn = () => {
        pageFit = false;
        if(parseFloat(scale) + 0.2 > 2.2) return scale;
        scale = parseFloat(scale) + 0.2;
        // scope.renderPage(scope.pageToDisplay);
        for(let i=0;i<canvas.length;i++) {
          scope.renderPage(i+1);
        }
        return scale;
      };

      scope.zoomOut = () => {
        pageFit = false;
        if(parseFloat(scale) - 0.2 < 0.2) return scale;
        scale = parseFloat(scale) - 0.2;
        // scope.renderPage(scope.pageToDisplay);
        for(let i=0;i<canvas.length;i++) {
          scope.renderPage(i+1);
        }
        return scale;
      };

      scope.fit = () => {
        pageFit = true;
        // scope.renderPage(scope.pageToDisplay);
        for(let i=0;i<canvas.length;i++) {
          scope.renderPage(i+1);
        }
      }

      scope.changePage = () => {
        scope.renderPage(scope.pageToDisplay);
      };

      scope.rotate = () => {
        for(let i=0; i<canvas.length; i++) {
          if (canvas[i].getAttribute('class') === 'rotate0') {
            canvas[i].setAttribute('class', 'rotate90');
          } else if (canvas[i].getAttribute('class') === 'rotate90') {
            canvas[i].setAttribute('class', 'rotate180');
          } else if (canvas[i].getAttribute('class') === 'rotate180') {
            canvas[i].setAttribute('class', 'rotate270');
          } else {
            canvas[i].setAttribute('class', 'rotate0');
          }
        }
      };

      scope.downloadFile = () => {
        /**
         * TODO falta añadir la descarga si es que manda una URL
         * TODO falta implementar para explorer
         * @description Solamente se implemento para la descarga desde base64
         */
        if (scope.data64) {
          const contentType = 'octet/stream';
          const fileName = `${scope.name}.pdf` || 'DocumentoNotarial.pdf';
          const sliceSize = 512;
          const byteCharacters = atob(scope.data64.replace("data:application/pdf;base64,",""));
          const byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new window.Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          const blob = new Blob(byteArrays, {type: contentType});
          var blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          element.append(a);
          $compile(a)(scope);         
          a.style.display = 'none';
          a.href = blobUrl;
          a.target = '_blank';
          a.download = fileName;
          a.click();
          angular.element(a).remove();
          window.URL.revokeObjectURL(blobUrl);
        }
      };

      scope.printFile = () => {
        let documento;
        // let blob = new Blob([scope.data.data], { type: 'application/pdf' });
        // let objectURL = window.URL.createObjectURL(blob, { type: "application/pdf" });
        if (scope.data && scope.data.url) {
          documento = $window.open( scope.data.url );
        } else {
          documento = $window.open( 'data:application/pdf;base64,' + scope.data64 );
        }
        // var documento = $window.open( $sce.trustAsResourceUrl(objectURL) );
        window.setTimeout(function () {
          documento.print(false);
          // documento.close();
        }, 1000);
      };

      scope.detectIE = () => {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
          // Edge (IE 12+) => return version number
          return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
      }
      /**
       * Determine the mobile operating system.
       * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
       *
       * @returns {String}
       */
      scope.getMobileOS = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
          return 'Windows Phone';
        }
        if (/android/i.test(userAgent)) {
          return 'Android';
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return 'iOS';
        }
        return false;
      }

      /**
       * b64toBlob - Convert base64 string to a Blob object
       *
       * @param  {string}  b64Data     Base64 string
       * @param  {strig}   contentType Type of base64 file
       * @param  {integer} sliceSize   Slice for performance
       * @return {Blob}                Blob object
       * @description https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
       */
      function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

      function clearCanvas() {
        for(let i=0; i<ctx.length; i++) {
          ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
        }
      }

      function renderPDF() {
        clearCanvas();

        let params;
        // let params = {
        //   'url': url,
        //   'withCredentials': creds
        // };

        if (httpHeaders) {
          params.httpHeaders = httpHeaders;
        }

        if (scope.data) {
          params = scope.data;
        }

        if (scope.data64) {
          params = {
            data: atob(scope.data64.replace('data:application/pdf;base64,',''))
          }
        }

        //if (url && url.length) {
        if (params) {
          pdfLoaderTask = PDFJS.getDocument(params);
          pdfLoaderTask.onProgress = scope.onProgress;
          pdfLoaderTask.onPassword = scope.onPassword;
          pdfLoaderTask.then(
            _pdfDoc => {
              if (angular.isFunction(scope.onLoad)) {
                scope.onLoad();
              }

              pdfDoc = _pdfDoc;
              // scope.renderPage(scope.pageToDisplay);
              for(var num = 1; num <= pdfDoc.numPages; num++) {
                canvas.push($document[0].createElement('canvas'));
                ctx[num-1] = canvas[num-1].getContext('2d');
                initCanvas(element, canvas[num-1], scope.nview);
                scope.renderPage(num);
              }

              scope.$apply(() => {
                scope.pageCount = _pdfDoc.numPages;
              });
            }, error => {
              if (error) {
                if (angular.isFunction(scope.onError)) {
                  scope.onError(error);
                }
              }
            }
          );
        }
      }

      scope.$watch('pageNum', newVal => {
        scope.pageToDisplay = parseInt(newVal);
        if (pdfDoc !== null) {
          scope.renderPage(scope.pageToDisplay);
        }
      });

      scope.$watch('data', newVal => {
        if (newVal && newVal !== '') {
          if (debug) {
            $log.log('data change detected: ', scope.data);
          }
          url = newVal;
          scope.pageNum = scope.pageToDisplay = pageToDisplay;
          if (pdfLoaderTask) {
            pdfLoaderTask.destroy().then(() => {
              renderPDF();
            });
          } else {
            renderPDF();
          }
        }
      });

      scope.$watch('data64', newVal => {
        if (newVal && newVal !== '') {
          if (debug) {
            $log.log('data64 change detected: ', scope.data64);
          }
          url = newVal;
          scope.pageNum = scope.pageToDisplay = pageToDisplay;
          if (pdfLoaderTask) {
            pdfLoaderTask.destroy().then(() => {
              renderPDF();
            });
          } else {
            renderPDF();
          }
        }
      });
    }
  }
}
