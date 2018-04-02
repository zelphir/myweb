import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'

const menus = {
  dev: [
    { to: '/', label: 'Home' },
    { to: '/resume', label: 'Resume' },
    { to: '/blog', label: 'Blog' },
    { to: '/photos', label: 'Photos' }
  ],
  photos: [{ to: '/', label: 'Home' }]
}

const Menu = ({ closeMenu, type }) => (
  <div className="menu">
    {menus[type].map(({ to, label }) => (
      <Link to={to} key={to} onClick={closeMenu}>
        {label}
      </Link>
    ))}
  </div>
)

Menu.propTypes = {
  type: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired
}

export default Menu
