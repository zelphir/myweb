import React from 'react'
import PropTypes from 'prop-types'
import { push as Menu } from 'react-burger-menu'
import Svg from 'react-inlinesvg'

import './Sidebar.scss'
import menu from '../assets/icons/menu.svg'
import cross from '../assets/icons/cross.svg'

import Stats from './Stats'
import Info from './Info'
import Nav from './Nav'
import Footer from './Footer'

const MobileHeader = (
  <React.Fragment>
    <div className="bm-header">{process.env.DOMAIN}</div>
    <img src={menu} className="bm-icon" />
  </React.Fragment>
)

const Sidebar = ({ isMobile, ...props }) => (
  <Menu
    id="sidebar"
    {...props}
    isOpen={!isMobile}
    disableOverlayClick={!isMobile}
    noOverlay={!isMobile}
    disableCloseOnEsc={!isMobile}
    customBurgerIcon={MobileHeader}
    customCrossIcon={<Svg src={cross} />}
    width={280}
    bodyClassName="menu-open"
  >
    <div className="sidebar-top">
      <Info />
      <Nav />
    </div>
    <div className="sidebar-bottom">
      <Stats />
      <Footer isMobile={isMobile} />
    </div>
  </Menu>
)

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
}

export default Sidebar
