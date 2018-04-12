import React from 'react'
import avatarDev from '../assets/images/avatar_dev.jpg'
import avatarPhotos from '../assets/images/avatar_photos.jpg'

const Info = ({ isDev }) => (
  <div className="info">
    <img
      src={isDev ? avatarDev : avatarPhotos}
      className="avatar"
      alt="Roberto Manzella"
    />
    <h3 className="name">
      <span>Roberto</span>
      <span>Manzella</span>
    </h3>
    <div className="about">
      <span>Full stack developer</span>
    </div>
  </div>
)

export default Info
