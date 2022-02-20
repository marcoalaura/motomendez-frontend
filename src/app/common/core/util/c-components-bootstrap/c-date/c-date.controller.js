'use strict';

class CDateController {
  constructor(){
    'ngInject';
    this.options= {};

  }
  $onInit(){
    this.options = {
      maxDate: this.maxDate,
      minDate: this.minDate,
      formatYear: 'yyyy',
      showWeeks: false
    };
  }
  verifyMaxDate(value) {
          if (!angular.isUndefined(this.maxDate)) {
            var dateSelected = new Date(value),
            maxDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate() + 1);
            return dateSelected < maxDate;
          }
          return true;
  }

  verifyMinDate(value) {
      if (!angular.isUndefined(this.minDate)) {
            var dateSelected = new Date(value),
            minDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() - 1);
            return dateSelected > minDate;
          }
          return true;
  }
}

export default CDateController;
