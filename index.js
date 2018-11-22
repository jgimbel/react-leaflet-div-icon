'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divicon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Divicon = exports.Divicon = function (_MapLayer) {
  _inherits(Divicon, _MapLayer);

  function Divicon() {
    _classCallCheck(this, Divicon);

    return _possibleConstructorReturn(this, (Divicon.__proto__ || Object.getPrototypeOf(Divicon)).apply(this, arguments));
  }

  _createClass(Divicon, [{
    key: 'createLeafletElement',


    // See https://github.com/PaulLeCam/react-leaflet/issues/275
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(fromProps) {
      this.updateLeafletElement(fromProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var container = this.leafletElement._icon;

      if (container) {
        return _reactDom2.default.createPortal(this.props.children, container);
      } else {
        return null;
      }
    }
  }]);

  return Divicon;
}(_reactLeaflet.MapLayer);

Divicon.propTypes = {
  opacity: _propTypes2.default.number,
  zIndexOffset: _propTypes2.default.number };
exports.default = (0, _reactLeaflet.withLeaflet)(Divicon);

