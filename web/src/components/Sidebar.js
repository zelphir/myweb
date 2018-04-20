import React from 'react'
import { SidebarJS } from 'react-sidebarjs'
import { withMql } from '../lib/withMql'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'
import './Sidebar.css'

const Sidebar = ({ isMobile }) => {
  return isMobile ? (
    <React.Fragment>
      <SidebarJS
        sidebarjsName="sidebar"
        sidebarjsConfig={{
          nativeSwipe: false,
          nativeSwipeOpen: false
        }}
      >
        <SidebarContent />
      </SidebarJS>
      <MobileHeader />
    </React.Fragment>
  ) : (
    <SidebarContent />
  )
}

export default withMql(Sidebar)
