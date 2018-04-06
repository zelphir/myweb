import React from 'react'
import PropTypes from 'prop-types'
import { SidebarJS, sidebarService } from 'react-sidebarjs'
import { withRouter } from 'react-static'
import { compose } from 'react-apollo'
import { withMql } from '../lib/withMql'
import SidebarContent from './SidebarContent'
import MobileHeader from './MobileHeader'

import './Sidebar.scss'

class Sidebar extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    isMobile: PropTypes.bool
  }

  closeSidebar = e => {
    e.preventDefault()
    sidebarService.close('sidebar')
  }

  render() {
    const { location, isMobile } = this.props
    const type = location.pathname.includes('/photos') ? 'photos' : 'dev'

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
          <span className="sidebar-close" onClick={this.closeSidebar}>
            &times;
          </span>
        </SidebarJS>
        <MobileHeader type={type} />
      </React.Fragment>
    ) : (
      <SidebarContent type={type} />
    )
  }
}

export default compose(withMql, withRouter)(Sidebar)
