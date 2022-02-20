'use strict';

class CrudTableModalController {
    constructor($scope, $uibModalInstance, data, DataService, $log) {
        'ngInject';
        
        this.fields = data.fields;
        this.url = data.url;
        this.title = data.title;
        this.idKey = data.idKey;
        this.DataService = DataService;
        this.$uibModalInstance = $uibModalInstance;
        this.$log = $log;

        if (data.item) {
            this.model = data.item;
        }
    }

    $onInit() {
        this.options = {
            formState: {
                
            }
        };
    }

    save() {
        if (this.model[this.idKey]) {
            this.model.id = this.model[this.idKey];            
        }
        this.DataService.save(this.url, this.model)
        .then(response => {
            if (response) {
                this.$uibModalInstance.close(response);
            }
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default CrudTableModalController;