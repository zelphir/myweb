import React from 'react'
import PropTypes from 'prop-types'
import { SidebarJS } from 'react-sidebarjs'
import { withRouter, matchPath } from 'react-router-dom'
import { compose } from 'react-apollo'
import { withMql } from '../lib/withMql'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'
import './Sidebar.css'

const Sidebar = ({ location, isMobile }) => {
  const type = matchPath(location.pathname, {
    pathname: /\/photos?/
  })
    ? 'photos'
    : 'dev'
  // location.pathname.includes(/photos?/) ? 'photos' : 'dev'

  return isMobile ? (
    <React.Fragment>
      <SidebarJS
        sidebarjsName="sidebar"
        sidebarjsConfig={{
          nativeSwipe: false,
          nativeSwipeOpen: false
        }}
      >
        <SidebarContent type={type} />
      </SidebarJS>
      <MobileHeader type={type} />
    </React.Fragment>
  ) : (
    <SidebarContent type={type} />
  )
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

export default compose(withMql, withRouter)(Sidebar)
