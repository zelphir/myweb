import React from 'react'
import PropTypes from 'prop-types'
import { SidebarJS } from 'react-sidebarjs'
import { withRouter } from 'react-static'
import { compose } from 'react-apollo'

import { withMql } from '../lib/withMql'
import { withPhotos } from '../lib/withPhotos'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'

import './Sidebar.scss'

const Sidebar = ({ location, isMobile }) => {
  const type = location.pathname === '/photos' ? 'photos' : 'dev'

  return isMobile ? (
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

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

export default compose(withMql, withPhotos, withRouter)(Sidebar)
