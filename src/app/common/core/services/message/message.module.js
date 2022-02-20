'use strict';

import MessageService from './message.service';

import './message.css';

const Message = angular
    .module('app.message', [])
    .service('Message', MessageService)
    .config((toastrConfig) => {
        angular.extend(toastrConfig, {
            allowHtml: true,
            closeButton: true,
            extendedTimeOut: 1000,
            progressBar: true,
            tapToDismiss: false,
            timeOut: 6000
      });
    })
    .name;

export default Message;