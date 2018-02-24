'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _defineProperty3 = require('babel-runtime/core-js/reflect/define-property');

var _defineProperty4 = _interopRequireDefault(_defineProperty3);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataInject = require('./dataInject');

var _functionInject = require('./functionInject');

var _scrollShow = require('./scrollShow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

//获取type(埋点触发类型)
var getType = function getType(tag) {
    if (!tag) return;
    return tag.type || 'CLICK';
};

//根据type类型处理埋点方式
var dealData = function dealData(_ref, _props) {
    var type = _ref.type,
        tag = _ref.tag,
        id = _ref.id;

    switch (type) {
        case 'RENDER':
            (0, _functionInject.log)(_dataInject.BD, tag);
            break;
        case 'CLICK':
            if (_props.onClick) {
                var fn = _props.onClick;
                _props.onClick = function () {
                    (0, _functionInject.log)(_dataInject.BD, tag);
                    fn();
                };
            } else {
                _props.onClick = function () {
                    return (0, _functionInject.log)(_dataInject.BD, tag);
                };
            }
            break;
        case 'SCROLL':
            _props.id = id;
            (0, _scrollShow.addDom)(tag, id);
    }
};

var TD = function (_React$Component) {
    _inherits(TD, _React$Component);

    function TD(props) {
        _classCallCheck(this, TD);

        var _this = _possibleConstructorReturn(this, (TD.__proto__ || (0, _getPrototypeOf2.default)(TD)).call(this, props));

        var type = getType(props.onTag);
        if (type === 'SCROLL') (0, _scrollShow.init)(_functionInject.log, _dataInject.BD);
        _this.state = {
            tag: props.onTag,
            type: type,
            id: 'tag' + new Date().getTime()
        };
        return _this;
    }

    _createClass(TD, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.type === 'MOUNT') (0, _functionInject.log)(_dataInject.BD, this.tag);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.type == 'SCROLL') (0, _scrollShow.deletDom)(id, tag.pid);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            (0, _defineProperty4.default)(_props, 'onTag');
            dealData(this.state, _props);
            return _react2.default.createElement(
                'div',
                _props,
                props.children
            );
        }
    }]);

    return TD;
}(_react2.default.Component);

exports.default = TD;