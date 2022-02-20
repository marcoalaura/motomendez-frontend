'use strict';

import Waves from './waves';

class MdEffect {
    constructor() {
        this.restrict = 'A';
    }

    link($scope, $elem, $attr) {
        let className = ['waves-light'];
        if ($attr.mdEffect.length) {
            let array = $attr.mdEffect.split(' ');
            if (array.length > 1) {
                className = array;
            } else {
                className = [$attr.mdEffect];
            }
        }
        if ($attr.class.indexOf('btn-secondary') != -1 || $attr.class.indexOf('btn-default') != -1) {
            className = [];
        }
        Waves.attach($elem, className);
        Waves.init();
    }
}

export default MdEffect;