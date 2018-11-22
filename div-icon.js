import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {DivIcon, marker} from 'leaflet';
import {MapLayer, withLeaflet} from 'react-leaflet';
import PropTypes from 'prop-types';

export class Divicon extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndexOffset: PropTypes.number,
  }

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(newProps) {
    const {map: _map, layerContainer: _lc, position, ...props} = newProps;
    this.icon = new DivIcon(props);
    return marker(position, {icon: this.icon, ...props});
  }

  updateLeafletElement(fromProps, toProps) {
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
      }
      else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  componentDidUpdate(fromProps) {
    this.updateLeafletElement(fromProps, this.props);
  }

  render() {
    const container = this.leafletElement._icon;

    if (container) {
      return ReactDOM.createPortal(this.props.children, container);
    } else {
      return null;
    }
  }
}

export default withLeaflet(Divicon);
