import React from 'react'
import PropTypes from 'prop-types'

import withMatchMedia from '../components/withMatchMedia'
import Sidebar from '../components/Sidebar'

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    isMobile: PropTypes.bool
  }

  render() {
    const { children, isMobile } = this.props

    return (
      <div id="container">
        <Sidebar
          pageWrapId={'page-wrap'}
          outerContainerId={'container'}
          id="sidebar"
          isMobile={isMobile}
        />
        <main id="page-wrap">{children()}</main>
      </div>
    )
  }
}

export default withMatchMedia(MainLayout)
