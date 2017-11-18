'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createContextProvider(context) {
  var ContextProvider = function (_Component) {
    _inherits(ContextProvider, _Component);

    function ContextProvider() {
      _classCallCheck(this, ContextProvider);

      return _possibleConstructorReturn(this, (ContextProvider.__proto__ || Object.getPrototypeOf(ContextProvider)).apply(this, arguments));
    }

    _createClass(ContextProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return context;
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);

    return ContextProvider;
  }(_react.Component);

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(function (key) {
    ContextProvider.childContextTypes[key] = _propTypes2.default.any;
  });
  return ContextProvider;
}

var Divicon = function (_MapLayer) {
  _inherits(Divicon, _MapLayer);

  function Divicon() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Divicon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Divicon.__proto__ || Object.getPrototypeOf(Divicon)).call.apply(_ref, [this].concat(args))), _this2), _this2.renderComponent = function () {
      var ContextProvider = createContextProvider(_extends({}, _this2.context, _this2.getChildContext()));
      var container = _this2.leafletElement._icon;
      var component = _react2.default.createElement(
        ContextProvider,
        null,
        _this2.props.children
      );
      if (container) {
        (0, _reactDom.render)(component, container);
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Divicon, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popupContainer: this.leafletElement
      };
    }

    // See https://github.com/PaulLeCam/react-leaflet/issues/275

  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(newProps) {
      var _map = newProps.map,
          _lc = newProps.layerContainer,
          position = newProps.position,
          props = _objectWithoutProperties(newProps, ['map', 'layerContainer', 'position']);

      this.icon = new _leaflet.DivIcon(props);
      return (0, _leaflet.marker)(position, _extends({ icon: this.icon }, props));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setLatLng(toProps.position);
      }
      if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
      }
      if (toProps.opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(toProps.opacity);
      }
      if (toProps.draggable !== fromProps.draggable) {
        if (toProps.draggable) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Divicon.prototype.__proto__ || Object.getPrototypeOf(Divicon.prototype), 'componentWillMount', this).call(this);
      this.leafletElement = this.createLeafletElement(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Divicon.prototype.__proto__ || Object.getPrototypeOf(Divicon.prototype), 'componentDidMount', this).call(this);
      this.renderComponent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(fromProps) {
      this.renderComponent();
      this.updateLeafletElement(fromProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Divicon;
}(_reactLeaflet.MapLayer);

Divicon.propTypes = {
  opacity: _propTypes2.default.number,
  zIndexOffset: _propTypes2.default.number
};
Divicon.childContextTypes = {
  popupContainer: _propTypes2.default.object
};
exports.default = Divicon;

