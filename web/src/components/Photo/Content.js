import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from '../Marker'
import mapStyle from './mapStyle.json'

const PhotoContent = ({ photo: { lat, lng, caption, imageUrl, tags } }) => {
  return (
    <div className="photo-content">
      <div className="details">
        <p>{caption}</p>
        <div className="picture">
          <img src={imageUrl} alt={caption} />
        </div>
        <div className="tags">
          {tags.map(({ name, id }) => <span key={id}>{name}</span>)}
        </div>
      </div>
      {lat &&
        lng && (
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_KEY
              }}
              center={[lat, lng]}
              defaultZoom={6}
              options={{ styles: mapStyle, fullscreenControl: false }}
            >
              <Marker lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        )}
    </div>
  )
}

export default PhotoContent
