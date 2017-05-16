'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: 'createLeafletElement',


    // See https://github.com/PaulLeCam/react-leaflet/issues/275
    value: function createLeafletElement(newProps) {
      var position = newProps.position,
          props = _objectWithoutProperties(newProps, ['position']);

      this.icon = new _leaflet.DivIcon(_extends({}, props));
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

      var el = _reactDom2.default.findDOMNode(this.divIcon);
      this.icon.options.html = el.outerHTML;
      this.leafletElement.setIcon(this.icon);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(fromProps) {
      this.updateLeafletElement(fromProps, this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var simulateToGetRefs = [];
      _react2.default.Children.map(this.props.children, function (child) {
        simulateToGetRefs.push(_react2.default.cloneElement(child, {
          key: child.key,
          ref: function ref(_ref) {
            return _this2.divIcon = _ref;
          }
        }));
      });

      return _react2.default.createElement(
        'div',
        { style: { display: 'none' } },
        simulateToGetRefs
      );
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

