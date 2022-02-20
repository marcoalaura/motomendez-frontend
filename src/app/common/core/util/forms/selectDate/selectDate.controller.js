'use strict';

class SelectDateController {

    constructor($scope, $log, Datetime) {
        'ngInject';
        this.$scope = $scope;
        this.$log = $log;
        this.Datetime = Datetime;
    }

    $onInit () {
      // this.$log.log('SelectDateController init');
      // this.$log.log(this);
      this.nowYear = new Date().getUTCFullYear();
      this.$scope.$watch('$ctrl.ngModel', ()=>{
        // this.$log.log('date', this.ngModel)
        if (angular.isUndefined(this.ngModel)) {
          this.day = null;
          this.month = null;
          this.year = null;
        } else {
          if (!this.internal_change) {
            var date = this.ngModel;
            if (typeof date=='string') {
              date = new Date(date);
              this.ngModel = new Date(this.ngModel);
            }
            if (this.Datetime.isDate(date)) {
              this.day = date.getUTCDate();
              this.month = date.getUTCMonth() + 1;
              this.year = date.getUTCFullYear();
            }
          }
          delete this.internal_change;
        }
      })
      this.initMonths();
    }

    initMonths () {
      var months = [];
      for (var i = 0; i < 12; i++) {
          months.push({
              val: i + 1,
              name: this.Datetime.months[i]
          });
      }
      this.months = months;
    }

    changeDate(prop) {
      if (prop=='day') {
        if (!(0<this.day && this.day < 32)) {
            this.day = null;
        }
      }
      if (prop=='month') {
        if (!(0<this.month && this.month < 13)) {
            this.month = null;
        }
      }
      // if (prop=='month') {
      //
      // }
      if (prop=='year') {
        // this.$log.log('year', angular.copy(this.year))
        if (this.year < this.nowYear - 120) {
            this.year = null;
        }
        if (this.year > this.nowYear) {
            this.year = null;
        }
        // this.$log.log('year', angular.copy(this.year))
      }
      if (this.year && this.month && this.day) {
        this.internal_change = true;
        this.ngModel = new Date(this.year, this.month-1, this.day);
      }
    }


}


export default SelectDateController;
