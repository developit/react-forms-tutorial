import preact from 'preact';

export const createComponent = function(obj) {
    function preactComponent() {
        preact.Component.call(this);

        if (obj.init) {
            obj.init.call(this);
        }
    }

    preactComponent.prototype = Object.assign(
        Object.create(preact.Component.prototype), obj
    );

    return preactComponent;
};
