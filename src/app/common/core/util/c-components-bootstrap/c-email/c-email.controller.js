'use strict';

class CTextAreaController{
  constructor(){
  }
  $onInit(){
    if (angular.isUndefined(this.placeholder)) {
      this.placeholder = this.label;
    }
  }
}
export default CTextAreaController;
