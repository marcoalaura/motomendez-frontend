'use strict';

import CInputComponent from './c-input/c-input.component';
import CInputMoneyComponent from './c-input-money/c-input-money.component';
import CSelectComponent from './c-select/c-select.component';
import CTextAreaComponent from './c-textarea/c-textarea.component';
import CCheckboxComponent from './c-checkbox/c-checkbox.component';
import CRadioButton from './c-radiobutton/c-radiobutton.component';
import CDateComponent from './c-date/c-date.component';
import CInputChipsComponent from './c-input-chips/c-input-chips.component';
import CEmailComponent from './c-email/c-email.component'
import Validation from './validation-components/validation.service';

// libreria mascara para el date
import uiMask from 'angular-ui-mask';

const UiComponentsBootstrapModule = angular
    .module('app.bcomponents', [uiMask])
    .component('bInput', CInputComponent)
    .component('bInputMoney',CInputMoneyComponent)
    .component('bSelect',CSelectComponent)
    .component('bCheckbox',CCheckboxComponent)
    .component('bRadiobutton',CRadioButton)
    .component('bTextarea',CTextAreaComponent)
    .component('bDate',CDateComponent)
    .component('bInputChips',CInputChipsComponent)
    .component('bEmail', CEmailComponent)
    .service('ValidationService', Validation)
    .name;

export default UiComponentsBootstrapModule;
