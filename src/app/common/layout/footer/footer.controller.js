'use strict';

class FooterController {
    constructor() {
        
    }

    $onInit() {
        let date = new Date();
        this.year = date.getFullYear();
    }
}

export default FooterController;