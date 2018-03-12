import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { push as Menu } from 'react-burger-menu'

import './Sidebar.scss'
import menu from '../assets/icons/menu.svg'

import Languages from './Languages'
import Info from './Info'
import Footer from './Footer'

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    id="sidebar"
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
    customBurgerIcon={<img src={menu} />}
    customCrossIcon={false}
    width={280}
    bodyClassName="menu-open"
  >
    <div className="sidebar-top">
      <Info />
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
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
