/*eslint no-console: ["error", { allow: ["group", "dir", "groupEnd", "table"] }] */
'use strict';

class DataService {

  constructor($http, $q, $location, $sce, DataServiceConfig, HTTPCanceler, Message, Util, apiUrl, searchUrl, appName, errorsLang, debug, $log, Storage, baseUrl) {
    'ngInject';

    this.$http = $http;
    this.$sce = $sce;
    this.defer = $q.defer();
    this.Message = Message;
    this.Util = Util;
    this.debug = debug;
    this.DataServiceConfig = DataServiceConfig;
    this.HTTPCanceler = HTTPCanceler;
    this.canceler = this.HTTPCanceler.get(this.defer, this.appName);
    this.apiUrl = apiUrl;
    this.searchUrl =searchUrl;
    this.errorsLang = errorsLang;
    this.baseUrl = baseUrl;
    this.appName = appName;
    this.Storage = Storage;

    this.PATERN_HOST = $location.protocol() == 'https' ? /(https:\/\/|www\.)\S+/i : /(http:\/\/|www\.)\S+/i;
    this.$log = $log;
  }

  cancelRequest() {
    this.HTTPCanceler.cancel();
    this.canceler = this.HTTPCanceler.get(this.defer, this.appName);
    this.cancel = true;
  }

  getUrl(url, id) {
    id = (typeof id == 'string' || typeof id == 'number') ? `${id}` : typeof id == 'object' && id.id ? `${id.id}` : '';
    if (url[url.length - 1] != '/' && id.length > 1) {
      id = `/${id}`;
    }
    return this.PATERN_HOST.test(url) ? (url + id) : this.apiUrl + url + id;
  }

  getUrl_base(url, id) {
    id = (typeof id == 'string' || typeof id == 'number') ? `${id}` : typeof id == 'object' && id.id ? `${id.id}` : '';
    if (url[url.length - 1] != '/' && id.length > 1) {
      id = `/${id}`;
    }
    return this.PATERN_HOST.test(url) ? (url + id) : this.baseUrl + url + id;
  }

  search(url, id) {
    id = (typeof id == 'string' || typeof id == 'number') ? `${id}` : typeof id == 'object' && id.id ? `${id.id}` : '';
    if (url[url.length - 1] != '/' && id.length > 1) {
      id = `/${id}`;
    }
    return this.PATERN_HOST.test(url) ? (url + id) : this.searchUrl + url + id;
  }
  options(url) {
    return this._http('get', url + '/fields');
  }

  get(url, id) {
    return this._http('get', url, id);
  }

  post(url, data) {
    return this._http('post', url, data);
  }
  searchUrl_(url, data) {
    return this._search('get', url, data);
  }
  put(url, data) {
    return this._http('put', url, data);
  }

  patch(url, data) {
    return this._http('patch', url, data);
  }

  delete(url, id) {
    return this._http('delete', url, id);
  }

  remove(url, id) {
    return this.delete(url, id);
  }

  list(url, query) {
    query = query ? '?' + this.Util.serialize(query) : '';
    return this._http('get', url + query);
  }

  save(url, data) {
    return this._http(data.id ? 'put' : 'post', url, data);
  }
  _search(method, url, data) {
    url = this.search(url, data);
    if (this.debug) {
      console.group('Petición con DataService:');
    }
    this.$log.info('URL:', method.toUpperCase(), url);
    if (data) {
      this.$log.info('Params:', data);
    }

    let setting = {
      method,
      url,
      timeout: this.canceler.promise
    };

    if (typeof data == 'object' && Object.keys(data).length) {
      delete data.id;
      setting.data = data;
    }

    return this.$http(setting)
    .then(response => this.filterResponse(response.data))
    .catch(error => {
      //const _errors = error.data.errors[0].messages[0];
      //error.data.mensaje=_errors;
      this.msgError(error)});
  }
  
  _baseUrl(method, url, data) {
    url = this.getUrl_base(url, data);
    this.$log.log('55555555555555555555555555555',url);
    
    if (this.debug) {
      console.group('Petición con DataService:');
    }
    this.$log.info('URL:', method.toUpperCase(), url);
    if (data) {
      this.$log.info('Params:', data);
    }

    let setting = {
      method,
      url,
      timeout: this.canceler.promise
    };

    if (typeof data == 'object' && Object.keys(data).length) {
      delete data.id;
      setting.data = data;
    }

    return this.$http(setting)
    .then(response => this.filterResponse(response.data))
    .catch(error => {
      this.msgError(error)
    });

  }
    
  _http(method, url, data) {
    url = this.getUrl(url, data);
    if (this.debug) {
      console.group('Petición con DataService:');
    }
    this.$log.info('URL:', method.toUpperCase(), url);
    if (data) {
      this.$log.info('Params:', data);
    }

    let setting = {
      method,
      url,
      timeout: this.canceler.promise
    };

    if (typeof data == 'object' && Object.keys(data).length) {
      delete data.id;
      setting.data = data;
    }

    return this.$http(setting)
    .then(response => this.filterResponse(response.data))
    .catch(error => {
      this.msgError(error)});

  }

  file(url, type, data = {}, onlyUrl) {
    url = this.getUrl(url);
    return this.$http.post(url, data, { responseType: 'arraybuffer' }) 
    .then(response => {
      if (response.data) {
        let file = new window.Blob([response.data], { type: type });
        let fileURL = window.URL.createObjectURL(file);
        return onlyUrl ? fileURL : this.$sce.trustAsResourceUrl(fileURL);
      }
      return null;
    }).catch(error => this.msgError(error));
  }

  pdf(url, data = {}, onlyUrl) {
    url = this.getUrl(url, data);
    return this.$http.post(url, data, { responseType: 'arraybuffer' })
    .then(response => {
      if (response.data) {
        let file = new window.Blob([response.data], { type: 'application/pdf' });
        let fileURL = window.URL.createObjectURL(file);
        return onlyUrl ? fileURL : this.$sce.trustAsResourceUrl(fileURL);
      }
      return null;
    }).catch(error => this.msgError(error));
  }

  setFormly(data) {
    this.formly = data;
  }

  filterResponse(response) {
    this.Storage.set('dateNow', response.fecha);
    let data = response.datos || response;
    this.$log.info("Respuesta:");
    if (this.debug) {
      console.dir(data);
    }
    if (this.Util.toType(data) == 'array') {
      this.$log.info("La respuesta es un Array:");
      if (window.navigator.appName == 'Netscape') {
        if (this.debug) {
          console.table(data);
        }
      } else {
        if (this.debug) {
          console.table(data.map(item => [item]));
        }
      }
    }
    console.groupEnd();
    if (typeof this.DataServiceConfig.filterResponse == 'function') {
      return this.DataServiceConfig.filterResponse(response, this.Message);
    }
    return response;
  }

  msgError(error) {
    if (this.debug) {
      console.dir('Error:', error);
      console.groupEnd();
    }
    var statusErrors = [500, 404, 409, 403, 401, 400, 502, 412];

    if (error.status === 408 || error.status === 504) {
      return error;
    } else if (this.errorsLang[error.status]) {
      this.Message[ statusErrors.indexOf(error.status) != -1 ? 'error' : 'warning' ](error.data.mensaje && typeof error.data.mensaje == 'string' ? error.data.mensaje : this.parseError(error.data) || this.errorsLang[error.status], error.data.errors ? this.errorsLang.validation : null);
    } else if (this.cancel) {
      this.Message.warning(this.errorsLang.cancelRequest);
      this.cancel = false;
    } else {
      this.Message.error(this.parseError(error.data) || this.errorsLang.connection, error && error.data && error.data.mensaje ? error.data.mensaje : null);
    }

    return null;
  }

  parseError(error) {
    var message = [];
    if (error) {
      if (error.errors) {
        if (error.detail || error.error) {
          return error.detail || error.error;
        }
        if (Object.keys(error.errors).length === 0) {
          return error;
        }

        error = error.errors;
        for (let i in error) {
          message.push('<strong>' + (error[i].label || i) + ':</strong> ' + (this.Util.toType(error[i].errors) == 'array' ? error[i].errors.join(', ') : error[i].errors));
        }
        return message.join('<br>');
      } else if (error.errorType && error.errorType == 'ValidationError') {
        error = error.property;
        for (let i in error) {
          message.push('<strong>' + (error[i].label || i) + ':</strong> ' + (this.Util.toType(error[i].errors) == 'array' ? error[i].errors.join(', ') : error[i].errors));
        }
        return message.join('<br>');
      }
    }
    return null;
  }

}

export default DataService;
