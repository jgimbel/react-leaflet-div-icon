# react-leaflet-div-icon
marker that will use children as the content if the marker.


##Installation

```sh
npm install --save react-leaflet-div-icon
```

##Usage

```js
import React, { Component } from 'react';
import { Map } from 'react-leaflet';
import DivICon from 'react-leafletl-div-icon';

export default class MapComponent extends Component {

  render() {
    return (
      <Map>
        <DivIcon position={this.props.userLocation} opacity={5}>
          <svg className="user-location" viewBox="0 0 120 120" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50"/>
            </svg>
        </DivIcon>
      </Map>
    )
  }
}

```
