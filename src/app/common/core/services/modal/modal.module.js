'use strict';

import ModalService from './modal.service';

const Modal = angular
    .module('app.modal', [])
    .service('Modal', ModalService)
    .name;

export default Modal;