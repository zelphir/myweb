import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { push as Menu } from 'react-burger-menu'

import './Sidebar.scss'
import menu from '../assets/menu.svg'

import Languages from './Languages'
import Footer from './Footer'

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
    customBurgerIcon={<img src={menu} />}
    customCrossIcon={false}
  >
    <div className="sidebar-top">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
    </div>
    <div className="sidebar-bottom">
      <Languages />
      <Footer />
    </div>
  </Menu>
)

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

export default Sidebar
