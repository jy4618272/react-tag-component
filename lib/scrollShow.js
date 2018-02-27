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
            var dir = item['data-dir'];
            if (dir === 'Top' && getBoundingClientRect.top - clientTop < clientHeight) {
                log(BD, item['data-log']);
                libs.delete(item);
            }
            if (dir === 'Left' && getBoundingClientRect.left - clientLeft < clientWidth) {
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

//计算根节点属性
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
var init = function init(fn, data) {
    log = fn;
    BD = data;
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
 * 增加滚动展现时埋点dom
 * @param {Object} tag 埋点参数 
 * @param {String} id 需要展现的id
 */
var addDom = function addDom(tag, id) {
    var n = tag.pid ? document.getElementById(tag.pid) : document.documentElement;
    if (n) {
        if (!pNode.has(n)) {
            pNode.set(n, caculateProperty(n));
            console.log(caculateProperty(n));
            addListener(n);
        }
        var pn = pNode.get(n);
        setTimeout(function () {
            try {
                var dom = document.getElementById(id);
                injectSumToDom(dom, pn, tag);
            } catch (e) {
                console.log(e);
            }
        }, 100);
    } else {
        console.warn('节点不存在');
        return;
    }
};

/**
 * 
 * @param {HTMLElement} dom 节点自身 
 * @param {Object} pnode 容器节点
 */
var injectSumToDom = function injectSumToDom(dom, pnode, tag) {
    var clientTop = pnode.clientTop,
        clientLeft = pnode.clientLeft,
        clientHeight = pnode.clientHeight,
        clientWidth = pnode.clientWidth;

    var selfClientTop = dom.getBoundingClientRect().top,
        selfClientLeft = dom.getBoundingClientRect().left;
    if (selfClientTop - clientTop > clientHeight) {
        dom['data-log'] = tag;
        dom['data-dir'] = 'Top';
        pnode.libs.add(dom);
    } else if (selfClientLeft - clientLeft > clientWidth) {
        dom['data-log'] = tag;
        dom['data-dir'] = 'Left';
        pnode.libs.add(dom);
    }
};

module.exports = {
    addDom: addDom,
    init: init,
    deletDom: deletDom
};