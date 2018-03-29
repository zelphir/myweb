import React from 'react'
import { SidebarJS } from 'react-sidebarjs'

import { Ctx } from '../lib/contexts'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'

import './Sidebar.scss'

const Sidebar = () => (
  <Ctx.Consumer>
    {({ isMobile }) =>
      isMobile ? (
        <React.Fragment>
          <SidebarJS sidebarjsName="sidebar">
            <SidebarContent />
          </SidebarJS>
          <MobileHeader />
        </React.Fragment>
      ) : (
        <SidebarContent />
      )
    }
  </Ctx.Consumer>
)

export default Sidebar
