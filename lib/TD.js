'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    return tag.type || 'click';
};

//注入id,滑动展现埋点需要
var tagId = 1;

//根据type类型处理埋点方式
var dealData = function dealData(_ref, _props) {
    var type = _ref.type,
        tag = _ref.tag,
        id = _ref.id;

    switch (type) {
        case 'render':
            (0, _functionInject.log)(_dataInject.BD, tag);
            break;
        case 'click':
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
        case 'scroll':
            _props.id = id;
    }
};

var TD = function (_React$Component) {
    _inherits(TD, _React$Component);

    function TD(props) {
        _classCallCheck(this, TD);

        var _this = _possibleConstructorReturn(this, (TD.__proto__ || (0, _getPrototypeOf2.default)(TD)).call(this, props));

        var type = getType(props.Tag);
        if (type === 'scroll') (0, _scrollShow.init)(_functionInject.log, _dataInject.BD);

        _this.state = {
            tag: props.Tag,
            type: type,
            id: type === 'scroll' ? 'tag' + tagId++ : ''
        };
        return _this;
    }

    _createClass(TD, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.type === 'mount') (0, _functionInject.log)(_dataInject.BD, this.state.tag);
            if (this.state.type === 'scroll') {
                (0, _scrollShow.addDom)(this.state.tag, this.state.id);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state.type == 'scroll') (0, _scrollShow.deletDom)(id, tag.pid);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = _extends({}, this.props);
            (0, _deleteProperty2.default)(_props, 'Tag');
            dealData(this.state, _props);
            return _react2.default.createElement(
                'div',
                _props,
                this.props.children
            );
        }
    }]);

    return TD;
}(_react2.default.Component);

exports.default = TD;