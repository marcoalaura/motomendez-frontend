'use strict';

class DashboardModalController {
    constructor($uibModalInstance, data) {
        'ngInject';
        
        this.items = data;
        this.$uibModalInstance = $uibModalInstance;
    }

    $onInit() {
        // this.selected es un dato de ejemplo
        this.selected = {
            item: this.items[0]
        };
    }

    ok() {
        // si se quiere enviar información al contenedor padre que llamó el modal se lo hace de esta manera:
        this.$uibModalInstance.close(this.selected.item); // this.selected.item se envía al contenedor padre que lo invocó
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default DashboardModalController;