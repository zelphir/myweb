import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../components/Sidebar'

class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  render() {
    const { children } = this.props

    return (
      <div id="container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'container'} isOpen={true} />
        <div id="page-wrap">{children()}</div>
      </div>
    )
  }
}

export default MainLayout
