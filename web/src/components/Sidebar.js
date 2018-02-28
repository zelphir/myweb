import React from 'react'
import { push as Menu } from 'react-burger-menu'
import './Sidebar.css'

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
  >
    <a>Home</a>
    <a>Item 1</a>
  </Menu>
)

export default Sidebar
