"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 埋点数据注入
 */

//埋点数据
var BD = null;

//注入埋点数据
var inject = function inject() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (BD) {
        BD = _extends({}, BD, data);
    } else {
        BD = data;
    }
};

module.exports = {
    get BD() {
        return BD;
    },
    inject: inject
};