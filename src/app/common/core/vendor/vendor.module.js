'use strict';

// Cargando elementos de bootstrap que se usarán en el sistema
import Datepicker from './angular-ui-bootstrap/src/datepicker';
import Datepickerpopup from './angular-ui-bootstrap/src/datepickerPopup';
import Dropdown from './angular-ui-bootstrap/src/dropdown';
import Accordion from './angular-ui-bootstrap/src/accordion';
import Alert from './angular-ui-bootstrap/src/alert';
import Buttons from './angular-ui-bootstrap/src/buttons';
import Modal from './angular-ui-bootstrap/src/modal';
import Popover from './angular-ui-bootstrap/src/popover';
import Tabs from './angular-ui-bootstrap/src/tabs';
import Timepicker from './angular-ui-bootstrap/src/timepicker';
import Tooltip from './angular-ui-bootstrap/src/tooltip';

import Waves from './waves/waves.module';
import Formly from './formly/formly.module';
import NgTags from './angular-chips';
import DirectiveNumeric from './angular-numeric-directive';
import EmailCheck from './angular-mailcheck'

import './vendor.css';

const Vendor = angular
    .module('app.vendor', [
        Datepicker,
        Datepickerpopup,
        Dropdown,
        Accordion,
        Alert,
        Buttons,
        Modal,
        Popover,
        Tabs,
        Timepicker,
        Tooltip,
        Waves,
        Formly,
        NgTags,
        DirectiveNumeric,
        EmailCheck
    ])
    .name;

export default Vendor;