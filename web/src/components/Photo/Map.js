import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
import Pin from './Pin'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ({ lat, lng, width, height }) => {
  return (
    lat &&
    lng && (
      <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        latitude={lat}
        longitude={lng}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        zoom={4}
        width={width}
        height={height}
      >
        <Marker latitude={lat} longitude={lng} offsetLeft={-20} offsetTop={-10}>
          <Pin />
        </Marker>
      </MapGL>
    )
  )
}

export default Map
