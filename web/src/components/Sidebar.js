import React from 'react'
import { SidebarJS } from 'react-sidebarjs'
import { withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'
import { withMql } from '../lib/withMql'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'
import './Sidebar.css'

const Sidebar = ({ location, isMobile }) => {
  const type = location.pathname.includes('/photo') ? 'photos' : 'dev'

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

export default compose(withMql, withRouter)(Sidebar)
