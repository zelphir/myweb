import React from 'react'
import PropTypes from 'prop-types'
import { SidebarJS } from 'react-sidebarjs'
import { withRouter } from 'react-static'

import { Ctx } from '../lib/contexts'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'

import './Sidebar.scss'

const Sidebar = ({ location }) => {
  const type = location.pathname === '/photos' ? 'photos' : 'dev'
  return (
    <Ctx.Consumer>
      {({ isMobile }) =>
        isMobile ? (
          <React.Fragment>
            <SidebarJS sidebarjsName="sidebar">
              <SidebarContent type={type} />
            </SidebarJS>
            <MobileHeader />
          </React.Fragment>
        ) : (
          <SidebarContent type={type} />
        )
      }
    </Ctx.Consumer>
  )
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Sidebar)
