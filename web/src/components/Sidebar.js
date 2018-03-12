import React from 'react'
import PropTypes from 'prop-types'
import { push as Menu } from 'react-burger-menu'

import './Sidebar.scss'
import menu from '../assets/icons/menu.svg'

import Languages from './Languages'
import Info from './Info'
import Nav from './Nav'
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
      <Nav />
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
