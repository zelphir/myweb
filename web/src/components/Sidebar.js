import React from 'react'
import PropTypes from 'prop-types'
import { SidebarJS } from 'react-sidebarjs'
import { withRouter } from 'react-static'
import { compose } from 'react-apollo'
import { withMql } from '../lib/withMql'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'

import './Sidebar.scss'

const Sidebar = ({ location, isMobile }) => {
  const type = location.pathname.includes('/photos') ? 'photos' : 'dev'

  return isMobile ? (
    <React.Fragment>
      <SidebarJS sidebarjsName="sidebar">
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
