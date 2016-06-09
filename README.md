# react-leaflet-div-icon
This extends the L.DivIcon class for react-leaflet. It allows a user to render some jsx onto the map, and control its position via the `position` prop.

##Installation

```sh
npm install --save react-leaflet-div-icon
```

##Options

props are pass directly to [DivIcon](http://leafletjs.com/reference.html#divicon) and [Marker](http://leafletjs.com/reference.html#marker). 

##Usage

make sure to edit the default `.leaflet-div-icon` class from its default back border, white background when using this.
```js
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import DivIcon from 'react-leaflet-div-icon';
export default class UserLocationExample extends Component {
  constructor() {
    super();
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
    };
  }

  handleClick() {
    this.refs.map.leafletElement.locate();
  }

  handleLocationFound(e) {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  }

  render() {
    const marker = this.state.hasLocation
      ? (
        <DivIcon position={this.state.latlng}>
          <svg className="user-location" viewBox="0 0 120 120" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50"/>
          </svg>
        </DivIcon>
      )
      : null;

    return (
      <Map
        center={this.state.latlng}
        length={4}
        onClick={::this.handleClick}
        onLocationfound={::this.handleLocationFound}
        ref='map'
        zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {marker}
      </Map>
    );
  }
}

```
