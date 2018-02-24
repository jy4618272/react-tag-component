'use strict';

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 滑动展现时埋点
 */

var pNode = new _map2.default(),
    log = null,
    BD = null;

//滚动处理事件 
var scrollFn = function scrollFn(e) {
    var target = e.target;
    var pn = pNode.get(target);
    var clientTop = pn.clientTop,
        clientLeft = pn.clientLeft,
        clientHeight = pn.clientHeight,
        clientWidth = pn.clientWidth,
        libs = pn.libs;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(libs.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            var getBoundingClientRect = item.getBoundingClientRect();
            if (item['data-log-time'] > 0 && (Math.abs(getBoundingClientRect.top - clientTop) < clientHeight || Math.abs(getBoundingClientRect.left - clientLeft) < clientWidth)) {
                item['data-log-time']--;
                log(BD, item['data-log']);
                libs.delete(item);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

//计算根几点属性
var caculateProperty = function caculateProperty(n) {
    var clientHeight = n.clientHeight,
        clientWidth = n.clientWidth,
        clientTop = n.getBoundingClientRect().top,
        clientLeft = n.getBoundingClientRect().left;
    return { clientHeight: clientHeight, clientWidth: clientWidth, clientTop: clientTop, clientLeft: clientLeft, libs: new _set2.default() };
};

//添加滚动事件
var addListener = function addListener(n) {
    return n.addEventListener('scroll', scrollFn);
};

//初始化，注入埋点数据和方法
var init = function init(log, BD) {
    log = log;
    BD = BD;
};

//删除卸载的节点
var deletDom = function deletDom(id, pid) {
    var pnode = pid ? document.getElementById(tag.pid) : document.documentElement;
    var n = document.getElementById(id);
    var obj = pNode.get(pnode);
    obj.libs.delete(n);
    if (obj.libs.size === 0) pNode.delete(pnode);
};

/**
 * 增加展现时埋点dom
 * @param {Object} tag 埋点参数 
 * @param {String} id 需要展现的id
 */
var addDom = function addDom(tag, id) {
    var n = tag.pid ? document.getElementById(tag.pid) : document.documentElement;
    if (n) {
        if (!pNode.has(n)) {
            pNode.set(n, caculateProperty(n));
            addListener(n);
        }
        var pn = pNode.get(n);
        setTimeout(function () {
            try {
                var dom = document.getElementById(id);
                dom['data-log-time'] = 1;
                dom['data-log'] = tag;
                pn.libs.add(dom);
            } catch (e) {
                console.log(e);
            }
        }, 100);
    } else {
        console.warn('节点不存在');
        return;
    }
};

module.exports = {
    addDom: addDom,
    init: init,
    deletDom: deletDom
};