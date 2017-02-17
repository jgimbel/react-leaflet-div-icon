'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Divicon = function (_MapLayer) {
  _inherits(Divicon, _MapLayer);

  function Divicon() {
    _classCallCheck(this, Divicon);

    return _possibleConstructorReturn(this, (Divicon.__proto__ || Object.getPrototypeOf(Divicon)).apply(this, arguments));
  }

  _createClass(Divicon, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Divicon.prototype.__proto__ || Object.getPrototypeOf(Divicon.prototype), 'componentWillMount', this).call(this);

      var _props = this.props,
          _map = _props.map,
          _lc = _props.layerContainer,
          position = _props.position,
          props = _objectWithoutProperties(_props, ['map', 'layerContainer', 'position']);

      this.icon = new _leaflet.DivIcon(props);
      this.leafletElement = (0, _leaflet.marker)(position, _extends({ icon: this.icon }, props));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Divicon.prototype.__proto__ || Object.getPrototypeOf(Divicon.prototype), 'componentDidMount', this).call(this);
      this.renderContent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.renderContent();
      if (this.props.position !== prevProps.position) {
        this.leafletElement.setLatLng(this.props.position);
      }
      if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
      }
      if (this.props.opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(this.props.opacity);
      }
      if (this.props.draggable !== prevProps.draggable) {
        if (this.props.draggable) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }
    }

    // See https://github.com/PaulLeCam/react-leaflet/issues/275

  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement() {}
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var container = this.leafletElement._icon;
      if (container) {
        (0, _reactDom.render)(_react.Children.only(this.props.children), container);
      }
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
  opacity: _react.PropTypes.number,
  zIndexOffset: _react.PropTypes.number
};
exports.default = Divicon;

