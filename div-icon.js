import React from 'react';
import PropTypes from 'prop-types';

import { DivIcon, marker } from 'leaflet';

import { MapLayer } from 'react-leaflet';
import ReactDOM from 'react-dom';

export default class Divicon extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndexOffset: PropTypes.number,
  };

  static childContextTypes = {
    popupContainer: PropTypes.object,
  };

  // See https://github.com/PaulLeCam/react-leaflet/issues/275
  createLeafletElement(newProps) {
    const {position, ...props} = newProps;

    this.icon = new DivIcon({ ...props });
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

  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = this.createLeafletElement(this.props);
  }

  componentDidMount() {
    super.componentDidMount();

    const el = ReactDOM.findDOMNode(this.divIcon);
    this.icon.options.html = el.outerHTML;
    this.leafletElement.setIcon(this.icon);
  }

  componentDidUpdate(fromProps) {
    this.updateLeafletElement(fromProps, this.props);
  }

  render() {
    const simulateToGetRefs = [];
    React.Children.map(this.props.children, (child) => {
      simulateToGetRefs.push(
        React.cloneElement(child, {
            key: child.key,
            ref: ref => this.divIcon = ref,
        }))
    });

    return (
      <div style={{ display: 'none' }}>
        { simulateToGetRefs }
      </div>
    );
  }
}