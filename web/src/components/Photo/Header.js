import React from 'react'
import { Link } from 'react-router-dom'

const PhotoHeader = ({ modal, photo, prevLocation }) => {
  return (
    <div className="photo-header">
      <h2>{photo.country}</h2>
      {modal && (
        <Link to={prevLocation} className="close">
          &times;
        </Link>
      )}
    </div>
  )
}

export default PhotoHeader
