'use strict';

const BreadcrumbFactory = function () {

    let factory = {
        parent: '',
        current: '',
        setParent: (parent) => {
            this.parent = parent;
        },
        setCurrent: (current) => {
            this.current = current;
        },
        getParent: () => {
            return this.parent;
        },
        getCurrent: () => {
            return this.current;
        }
    };

    return factory;

};

export default BreadcrumbFactory;