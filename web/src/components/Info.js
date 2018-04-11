import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import avatarDev from '../assets/images/avatar_dev.jpg'
import avatarPhotos from '../assets/images/avatar_photos.jpg'

const Info = ({ isDev, closeMenu }) => (
  <div className="info">
    <Link to="/" onClick={closeMenu}>
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
    </Link>
  </div>
)

Info.propTypes = {
  isDev: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired
}

export default Info
