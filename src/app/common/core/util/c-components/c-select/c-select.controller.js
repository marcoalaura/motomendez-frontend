'use strict';
import './c-select.scss';
class CSelectController {
    constructor() {

    }
    $onInit() {
        this.field = angular.isUndefined(this.field)? 'nombre' : this.field;
        this.placeholder = angular.isUndefined(this.placeholder)? 'Seleccione ...' : this.placeholder;
    }

}
export default CSelectController;
