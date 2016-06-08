import { PropTypes } from 'react';
import { render } from 'react-dom';
import { DivIcon, marker } from 'leaflet';

import { latlngType } from 'react-leaflet/types/latlng';
import MapLayer from 'react-leaflet';

export default class Divicon extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    position: latlngType.isRequired,
    zIndexOffset: PropTypes.number,
  };

  componentWillMount() {
    super.componentWillMount();
    this.icon = new DivIcon(props);
    const { map: _map, layerContainer: _lc, position, ...props } = this.props;
    this.leafletElement = marker(position, { icon: this.icon,  ...props });
  }

  componentDidUpdate(prevProps) {
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
      }
      else {
        this.leafletElement.dragging.disable();
      }
    }
  }

  renderContent() {
    const container = this.leafletElement._icon;
    render(
      Children.only(this.props.children),
      container
    );
  }

  render() {
    return null;
  }
}
