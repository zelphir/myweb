import React from 'react'
import { push as Menu } from 'react-burger-menu'
import './Sidebar.css'

const Sidebar = props => (
  <Menu {...props} noOverlay>
    <a>Home</a>
    <a>Item 1</a>
  </Menu>
)

export default Sidebar
