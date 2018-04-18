import React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Pin from './Pin'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapBox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY
})

const Map = ({ lat, lng, width, height }) => {
  const containerStyle = {
    ...(width && { width }),
    ...(height && { height })
  }

  return (
    lat &&
    lng && (
      <MapBox
        center={[lng, lat]}
        style="mapbox://styles/mapbox/dark-v9" // eslint-disable-line
        zoom={[4]}
        containerStyle={containerStyle}
      >
        <Marker coordinates={[lng, lat]} offset={-5}>
          <Pin />
        </Marker>
      </MapBox>
    )
  )
}

export default Map
