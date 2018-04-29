import React from 'react'
import { SidebarJS } from 'react-sidebarjs'
import { withMql } from '../../lib/withMql'
import Content from './Content'
import MobileHeader from '../MobileHeader'

const Sidebar = ({ isMobile, isPrint }) => {
  return isMobile ? (
    <React.Fragment>
      <SidebarJS
        sidebarjsName="sidebar"
        sidebarjsConfig={{
          nativeSwipe: false,
          nativeSwipeOpen: false
        }}
      >
        <Content />
      </SidebarJS>
      {!isPrint && <MobileHeader />}
    </React.Fragment>
  ) : (
    <Content />
  )
}

export default withMql(Sidebar)
