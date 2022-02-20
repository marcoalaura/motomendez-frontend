'use strict';

class FilterService {

  constructor() {

    this.exceptions = {
      "integer"           : [46, 8, 9, 27, 13, 110, 173, 189, 109],
      "natural"           : [46, 8, 9, 27, 13, 110, 190],
      "decimal"           : [46, 8, 9, 27, 13, 110, 190, 173, 189, 109],
      "decimal_positive"  : [46, 8, 9, 27, 13, 110, 190],
      "numeric"           : [46, 8, 9, 27, 13],
      "alpha"             : [46, 8, 9, 27, 13, 32],
      "alpha_dash"        : [46, 8, 9, 27, 13, 32, 173, 189, 109],
      "passport"          : [46, 8, 9, 27, 13, 32, 173, 189, 109, 190, 0, 192]
    };
    this.exceptions.alpha_numeric = this.exceptions.alpha;
    this.evaluate = {
      numeric : (e) => {
        return (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105);
      },
      alpha : (e) => {
        return e.keyCode < 65 || e.keyCode > 90;
      }
    };
    this.evaluate.integer = this.evaluate.numeric;
    this.evaluate.decimal = this.evaluate.numeric;
    this.evaluate.natural = this.evaluate.numeric;
    this.evaluate.decimal_positive = this.evaluate.numeric;
    this.evaluate.alpha_numeric = (e) => {
      return this.evaluate.alpha(e) && this.evaluate.numeric(e);
    };
    this.evaluate.alpha_dash = this.evaluate.alpha_numeric;
    this.evaluate.alpha_dash = this.evaluate.alpha_numeric;
    this.evaluate.passport = this.evaluate.alpha_numeric;
  }

  $onInit() {

  }

  nit() {
    let nit = {
      verhoeff : (x, y) => {
        var m = ['0123456789', '1234067895', '2340178956', '3401289567', '4012395678', '5987604321', '6598710432', '7659821043', '8765932104', '9876543210'];
        if (m[x] && m[x][y]) {
          return parseInt(m[x][y]);
        }
        return -1;
      },

      permutations : (x, y) =>  {
        var m = ['0123456789', '1576283094', '5803796142', '8916043527', '9453126870', '4286573901', '2793806415', '7046913258'];
        if (m[x] && m[x][y]) {
          return parseInt(m[x][y]);
        }
        return -1;
      },

      evaluate : (num) => {
        var check = 0, x, y, z;

        if (typeof num == 'string' && isNaN(num)) {
          return false;
        }
        num = parseInt(num);
        for (var i = 0, l = num.toString().length; i < l; i++) {
          x = i % 8;
          y = num % 10;
          num = Math.floor(num/10);
          z = nit.permutations(x, y);
          check = nit.verhoeff(check, z);
        }

        return check === 0;
      }
    };

    return nit;
  }

  filterBase(e, type) {
    if (e.altKey === true && e.keyCode >= 96 && e.keyCode <= 105) {
      e.preventDefault();
    }
    if (this.exceptions[type].indexOf(e.keyCode) !== -1 || (e.keyCode == 86 && e.ctrlKey === true) || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    if (this.evaluate[type](e)) {
      if (type.indexOf('alpha') === 0) {
        if (!(e.key == 'ñ' || e.key == 'Ñ')) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }
  }

  isNumber(o) {
    return typeof o === 'number' && isFinite(o);
  }

  isFloat(value) {
    return value % 1 !== 0;
  }

  integer(e) {
    this.filterBase(e, 'integer');
  }

  isInteger(value) {
    if (/[a-zA-Z]+/g.test(value) || !/^-?[0-9.]*$/g.test(value)) {
      return false;
    }
    value = this.convert(value);
    if (value === 'NaN' || !this.isNumber(value)) {
      return false;
    }
    return !this.isFloat(value);
  }

  decimal(e) {
    this.filterBase(e, 'decimal');
  }

  isDecimal(value) {
    if (/[a-zA-Z]+/g.test(value) || !/^-?[0-9.]+\,?[0-9]*$/g.test(value)) {
      return false;
    }
    value = this.convert(value);
    if (value === 'NaN') {
      return false;
    }
    return this.isNumber(value);
  }

  decimalPositive(e) {
    this.filterBase(e, 'decimal_positive');
  }

  isDecimalPositive(value) {
    if (/[a-zA-Z]+/g.test(value) || !/^[0-9.]+\,?[0-9]*$/g.test(value)) {
      return false;
    }
    value = this.convert(value);
    if (value === 'NaN') {
      return false;
    }
    return this.isNumber(value);
  }

  decimalFormat(e) {

    this.decimalPositive(e);

    let valor = e.target.value;
    let exceptions = [37, 39, 46, 8, 9];
    let t = e.keyCode ? e.keyCode : e.which;
    let target = e.target;

    if (valor.match(/\./g)) {
      if (t == 190 || t == 110) {
        e.preventDefault();
      }
      let char = t >= 96 && t <= 105 ? t - 96 : String.fromCharCode(t);
      let newValue = valor.substring(0, target.selectionStart) + char + valor.substring(target.selectionEnd);
      if (!/^(\d+(?:\.?\d{0,2})?)?$/g.test(newValue) && exceptions.indexOf(t) == -1) {
        e.preventDefault();
      }
    } else {
      if (t == 190 || t == 110) {
        let decimal = valor.substring(target.selectionEnd);
        if (decimal.length > 2) {
          decimal = decimal.substring(0, 2);
          e.target.value = valor.substring(0, target.selectionStart) + '.' + decimal;
          e.preventDefault();
        }
        if (valor.length === 0) {
          e.target.value = '0';
        }
      }
    }
  }

  isDecimalFormat(value) {
    return /^(\d+(?:\.?\d{0,2})?)?$/g.test(value);
  }

  natural(e) {
    this.filterBase(e, 'natural');
  }

  isNatural(value) {
    if (/[a-zA-Z]+/g.test(value) || !/^[0-9]*$/g.test(value)) {
      return false;
    }
    value = this.convert(value);
    if (value === 'NaN' || !this.isNumber(value)) {
      return false;
    }
    return !this.isFloat(value) && value >= 0;
  }

  numeric(e) {
    this.filterBase(e, 'numeric');
  }

  isNumeric(value) {
    return /^([0-9])*$/.test(value);
  }

  alpha(e) {
    this.filterBase(e, 'alpha');
  }

  isAlpha(value) {
    return /^[\u00D1\u00F1A-Z a-z]*$/.test(value);
  }

  alphaNumeric(e) {
    this.filterBase(e, 'alpha_numeric');
  }

  isAlphaNumeric(value) {
    return /^[\u00D1\u00F1A-Z a-z0-9]*$/.test(value);
  }

  alphaDash(e) {
    this.filterBase(e, 'alpha_dash');
  }

  isAlphaDash(value) {
    return /^[\u00D1\u00F1A-Z a-z-_0-9]*$/.test(value);
  }

  passport(e) {
    this.filterBase(e, 'passport');
  }

  isPassport(value) {
    return /^[\u00D1\u00F1A-Z a-z-_0-9\.]*$/.test(value);
  }

  isPhone(value) {
    return /^(?:(?:\(?(?:00|\+)([1-e]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(value);
    // return /[\d()*+\- ]+/.test(value);
  }

  removeTagHTML(text) {
    return text.replace(/<([^ >]+)[^>]*>.*?<\/\1>|<[^\/]+\/>/gi, "");
  }

  empty(value) {
    return value === undefined || value === null || value.length === 0 || /^\s+$/.test(value);
  }

  isEmail(value) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }

  convert(value) {
    return parseFloat(isNaN(value) ? value.replace(/\./g, '').replace(',', '.') : value);
  }

  isNit(value) {
    return this.nit().evaluate(value);
  }
}

export default FilterService;
