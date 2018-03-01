import React from 'react'
import PropTypes from 'prop-types'
import { push as Menu } from 'react-burger-menu'

import './Sidebar.scss'
import menu from './SidebarMenu.svg'

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
    customBurgerIcon={<img src={menu} />}
  >
    <a href="/">Home</a>
  </Menu>
)

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

export default Sidebar
