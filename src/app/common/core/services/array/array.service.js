'use strict';

class ArrayService {
    constructor() {
        "ngInject";
    }

    replace (text, find, replace) {
        for (var i = 0, l = find.length, regex; i < l; i++) {
            regex = new RegExp(find[i], "g");
            text = text.replace(regex, replace[i]);
        }
        return text;
    }

    insert (arr, index, item) {
        return arr.splice(index, 0, item);
    }
}

export default ArrayService;