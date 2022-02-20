'use strict';

import CInputComponent from './c-input/c-input.component';
import CInputMoneyComponent from './c-input-money/c-input-money.component';
import CSelectComponent from './c-select/c-select.component';
import CTextAreaComponent from './c-textarea/c-textarea.component';
import CCheckboxComponent from './c-checkbox/c-checkbox.component';
import CRadioButton from './c-radiobutton/c-radiobutton.component';
import CDateComponent from './c-date/c-date.component';
import CInputChipsComponent from './c-input-chips/c-input-chips.component';

// libreria mascara para el date
import uiMask from 'angular-ui-mask';

const UiComponentsModule = angular
    .module('app.ccomponents', [uiMask])
    .component('cInput', CInputComponent)
    .component('cInputMoney',CInputMoneyComponent)
    .component('cSelect',CSelectComponent)
    .component('cCheckbox',CCheckboxComponent)
    .component('cRadiobutton',CRadioButton)
    .component('cTextarea',CTextAreaComponent)
    .component('cDate',CDateComponent)
    .component('cInputChips',CInputChipsComponent)
    .name;

export default UiComponentsModule;
