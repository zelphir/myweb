import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'

import './SidebarContent.scss'

import Stats from './Stats'
import Info from './Info'
import Footer from './Footer'

const Sidebar = ({ isMobile, onSetOpen }) => {
  const scrollToTop = () => {
    document.getElementsByClassName('main')[0].scrollTo(0, 0)
    isMobile && onSetOpen(false)
  }

  return (
    <React.Fragment>
      <div className="sidebar-top">
        <Info />
        <div className="menu">
          <Link to="/" onClick={scrollToTop}>
            Home
          </Link>
          <Link to="/resume" onClick={scrollToTop}>
            Resume
          </Link>
          <Link to="/blog" onClick={scrollToTop}>
            Blog
          </Link>
        </div>
      </div>
      <div className="sidebar-bottom">
        <Stats />
        <Footer isMobile={isMobile} />
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  onSetOpen: PropTypes.func
}

export default Sidebar
