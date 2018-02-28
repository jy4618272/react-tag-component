'use strict';

/**
 * 埋点事件注入
 */

//埋点事件
var log = null;

//事件注入
var inject = function inject(fn) {
    if (fn && typeof fn == 'function') {
        log = function log() {
            try {
                return fn.apply(undefined, arguments);
            } catch (e) {
                console.error(e);
                return;
            }
        };
    }
};

module.exports = {
    get log() {
        return log;
    },
    inject: inject
};