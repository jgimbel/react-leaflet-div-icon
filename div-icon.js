import React, {Component, Children} from 'react';
import {render} from 'react-dom';
import {DivIcon, marker} from 'leaflet';
import {MapLayer} from 'react-leaflet';
import PropTypes from 'prop-types';

function createContextProvider(context) {
  class ContextProvider extends Component {
    getChildContext() {
      return context;
    }

    render() {
      return this.props.children;
    }
  }

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = PropTypes.any;
  });
  return ContextProvider;
}

export default class Divicon extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndexOffset: PropTypes.number,
  };

  static childContextTypes = {
    popupContainer: PropTypes.object,
  };

  getChildContext() {
    return {
      popupContainer: this.leafletElement,
    }
  }

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(newProps) {
    const {map: _map, layerContainer: _lc, position, ...props} = newProps;
    this.icon = new DivIcon(props);
    return marker(position, {icon: this.icon, ...props});
  }

  updateLeafletElement(fromProps, toProps) {
    // Even if we don't get a legnth of 2, this will work as the array will return undefined
    const fromPosition = fromProps.position || []
    const toPosition = toProps.position || []

    if (toPosition[0] !== fromPosition[0] ||
        toPosition[1] !== fromPosition[1]) {
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
      }
      else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = this.createLeafletElement(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    this.ContextProvider = createContextProvider({...this.context, ...this.getChildContext()});
    this.renderComponent();
  }

  componentDidUpdate(fromProps) {
    this.renderComponent();
    this.updateLeafletElement(fromProps, this.props);
  }

  renderComponent = () => {
    const container = this.leafletElement._icon;
    const component = (
      <this.ContextProvider>
        {this.props.children}
      </this.ContextProvider>
    );
    if (container) {
      render(
        component,
        container
      );
    }
  }

  render() {
    return null;
  }

}

