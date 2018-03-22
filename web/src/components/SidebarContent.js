import React from 'react'
import PropTypes from 'prop-types'

import './SidebarContent.scss'

import Stats from './Stats'
import Info from './Info'
import Nav from './Nav'
import Footer from './Footer'

const Sidebar = ({ isMobile }) => (
  <React.Fragment>
    <div className="sidebar-top">
      <Info />
      <Nav />
    </div>
    <div className="sidebar-bottom">
      <Stats />
      <Footer isMobile={isMobile} />
    </div>
  </React.Fragment>
)

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

export default Sidebar
