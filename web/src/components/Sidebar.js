import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { push as Menu } from 'react-burger-menu'

import './Sidebar.scss'
import menu from './SidebarMenu.svg'

import Languages from './Languages'

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
    customBurgerIcon={<img src={menu} />}
  >
    <div className="sidebar-top">
      <Link to="/">Home</Link>
    </div>
    <div className="sidebar-bottom">
      <Languages />
    </div>
  </Menu>
)

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

export default Sidebar
