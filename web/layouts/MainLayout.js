import React from 'react'
import PropTypes from 'prop-types'

import withMatchMedia from '../lib/withMatchMedia'
import BaseLayout from './BaseLayout'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ isMobile, children, title = 'This is the default title' }) => (
  <BaseLayout title={title}>
    <div id="container">
      <Sidebar
        pageWrapId={'page-wrap'}
        outerContainerId={'container'}
        id="sidebar"
        isMobile={isMobile}
      />
      <main id="page-wrap">{children}</main>
    </div>
  </BaseLayout>
)

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  isMobile: PropTypes.bool.isRequired,
  title: PropTypes.string
}

export default withMatchMedia(MainLayout)
