"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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
        BD = (0, _assign2.default)(BD, data);
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