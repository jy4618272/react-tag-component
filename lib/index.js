'use strict';

var TD = require('./TD');
var injectData = require('./dataInject').inject;
var injectFunction = require('./functionInject').inject;

module.exports = {
    get injectData() {
        return injectData;
    },
    get injectFunction() {
        return injectFunction;
    },
    init: function init(bd) {
        return function (fn) {
            injectData(bd);
            injectFunction(fn);
        };
    },

    get TD() {
        return require('./TD').default;
    }
};