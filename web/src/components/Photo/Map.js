import React from 'react'
import ReactMap from 'pigeon-maps'
import Marker from 'pigeon-overlay'
import Pin from './Pin'

const mapbox = (mapboxId, accessToken) => (x, y, z) => {
  const retina =
    typeof window !== 'undefined' && window.devicePixelRatio >= 2 ? '@2x' : ''
  return `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${retina}?access_token=${accessToken}`
}

const Map = ({ lat, lng, width, height, light }) => {
  const position = [lat, lng]
  const provider = mapbox(
    light ? 'light-v9' : 'dark-v9',
    process.env.REACT_APP_MAPBOX_API_KEY
  )

  return (
    lat &&
    lng && (
      <ReactMap
        center={position}
        zoom={5}
        width={width}
        height={height}
        provider={provider}
        animate={false}
        attribution={false}
        attributionPrefix={false}
        zoomOnMouseWheel={false}
        mouseWheelMetaText={null}
      >
        <Marker anchor={position} offset={[10, 25]}>
          <Pin />
        </Marker>
      </ReactMap>
    )
  )
}

export default Map
