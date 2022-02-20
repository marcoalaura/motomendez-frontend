'use strict';

class UtilService {

  constructor($injector, $location, $anchorScroll, $log) {
    "ngInject";

    this.$injector = $injector;
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
    this.$log = $log;
  }

  $onInit() {
    this.tmpl_print = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Document</title>
        <style>{css}</style>
      </head>
      <body>{body}</body>
      </html>`;
  }

  toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  isJson (text) {
    return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
  }

  stripHTML(texto) {
    return texto.replace(/(<([^>]+)>)/ig,"");
  }

  nano (template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
      var keys = key.split("."), v = data[keys.shift()];
      for (var i = 0, l = keys.length;i < l;i++)
        v = v[keys[i]];
      return (typeof v !== "undefined" && v !== null) ? v : "";
    });
  }

  print (html, css) {
    if (typeof css == 'string') {
      angular.element.get(css, (response) => {
        var popup = window.open('', 'print');
        popup.document.write(this.nano(this.tmpl_print, {body : html, css : response}));
        popup.document.close();
        popup.focus();
        popup.print();
        popup.close();
      });
    } else {
      var popup = window.open('', 'print');
      popup.document.write(this.nano(this.tmpl_print, {body : html, css : css}));
      popup.document.close();
      popup.focus();
      popup.print();
      popup.close();
    }

    return true;
  }

  /**
   * Función para crear una pausa para ejecutar una instrucción:
   *  Ejemplo:
   *
   *  let funcionConDelay = this.Util.debounce(function() {
   *      // ... lo que se quiere ejecutar con el retraso
   *  }, 1000);
   *
   *  funcionConDelay(); // Ejecutando el retraso
   */
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  popup(url) {
    window.open(url, 'print');
  }

  fullscreen () {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  size(obj) {
    return Object.keys(obj).length;
  }

  serialize(json) {
    var string = [];
    for (var i in json) {
      string.push(i + '=' + json[i]);
    }
    return string.join('&');
  }

  getMenuOption(menu, url) {
    for (var i in menu) {
      if (typeof menu[i].submenu != 'undefined') {
        var pages = menu[i].submenu;
        for (var j in pages) {
          if (pages[j].url == url) {
            return [menu[i].label, pages[j].label];
          }
        }
      }
    }
    for (var k in menu) {
      if (menu[k].url == url) {
        return [menu[k].label, false];
      }
    }
    return [false,false];
  }

  getKeys(data) {
    var types = {};

    data.map((el) => {
      types[el.key] = el;
    });

    return types;
  }


  /**
   * Public: funcion que retrasa la ejecucion de una funcion, y que al volverse a activar reinicia el timeout
   * @param {Object} obj  objeto que guardara la referencia del intervalo
   * @param {Integer} ms  tiempo en miliesgundos
   * @param {Function} func funcion callback
   * *
   * Ejemplo
   this.timer = {};
   this.Util.funcDelay(this.timer, 1000, ()=> {
     this.personalSave(form, per);
   })
   */
  funcDelay (obj, ms, func) {
    if ( obj.timer_delay )
      clearTimeout (obj.timer_delay);

    obj.timer_delay = setTimeout(() => {
      obj.timer_delay = null;
      func();
    }, ms);
  }

  setTouchedForm (form, val, ignored, focusear) {
    var focus, funcRecursive;
    // this.$log.log(form);
    // this.$log.log(val, ignored);
    if (ignored) {
      focus = ignored.split(', ');
      ignored = {};
      focus.forEach( it => {
        ignored[it] = true;
      })
    } else {
      ignored = {};
    }
    if (angular.isUndefined(val)) val = true;
    focus = val && angular.isDefined(focusear);
    // var visits = {};
    // this.$log.log(visits);
    funcRecursive = (form, val, ignored) => {
      form.$$controls.forEach( field => {
        // if (!visits[field.$name])
          // visits[field.$name] = 0;
        if (field.$name!='' && !ignored[field.$name]) {
          // visits[field.$name]++;
          if (field.$$controls) {
            funcRecursive(field, val, ignored);
          } else {
            if (focus && field.$invalid) {
              // this.$log.log(field);
              var node = field.$$element[0];
              var x = node.contentEditable;
              node.contentEditable =  true;
              if (node.disabled) {
                node.disabled = false;
                node.focus();
                node.disabled = true;
              }else {
                node.focus();
              }
              node.contentEditable = x;
              // this.$log.log(x, node);
              node = field.$$element.closest(focusear);
              if (node) {
                // this.gotoAnchor(null, node);
                node.classList.add('blink-container');
                setTimeout(() => {
                    node.classList.remove('blink-container');
                }, 5000);
              }

              // field.$$element.closest('div.form-group').focus();
              focus = !focus;
            }
            if (val) {
              field.$setTouched();
            } else {
              field.$setUntouched();
            }
          }
        }
      })
    };
    funcRecursive(form, val, ignored);
  }

  isValidForm (form, ignored) {
    var resp, funcRecursive;
    // this.$log.log(form);
    // this.$log.log(val, ignored);
    if (ignored) {
      resp = ignored.split(', ');
      ignored = {};
      resp.forEach( it => {
        ignored[it] = true;
      })
    } else {
      ignored = {};
    }
    resp = true;
    // var visits = {};
    // this.$log.log(visits);
    funcRecursive = (form, ignored) => {
      form.$$controls.forEach( field => {
        // if (!visits[field.$name])
          // visits[field.$name] = 0;
        if (field.$name!='' && !ignored[field.$name]) {
          // visits[field.$name]++;
          if (field.$$controls) {
            funcRecursive(field, ignored);
          } else {
            if (field.$invalid)
              resp = false;
          }
        }
      })
    };
    funcRecursive(form, ignored);
    return resp;
  }

  id(length = 5) {
    let zero = '';
    for (let i = 0, l = length; i < l; i++) {
      zero += '0';
    }
    return (zero + (Math.random() * Math.pow(36, length) << 0).toString(36)).slice(-1 * length);
  }

  gotoAnchor(id) {
    if (this.$location.hash() !== id) {
      this.$location.hash(id);
    } else {
      this.$anchorScroll();
    }
    let el = document.querySelector(`#${id}`);
    if (el) {
      el.classList.add('blink-container');
      setTimeout(() => {
        el.classList.remove('blink-container');
      }, 8000);
    }
  }
}

export default UtilService;
