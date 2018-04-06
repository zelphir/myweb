import React from 'react'
import PropTypes from 'prop-types'
import { sidebarService } from 'react-sidebarjs'
import classNames from 'classnames/dedupe'
import Stats from './Stats'
import Footer from './Footer'
import Menu from './Menu'
import Info from './Info'

class Sidebar extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  closeMenu = () => {
    sidebarService.close('sidebar')
  }

  render() {
    const { type } = this.props
    const isDev = type === 'dev'

    return (
      <aside className={classNames('sidebar', type)} id="sidebar">
        <div className="sidebar-top">
          <Info isDev={isDev} closeMenu={this.closeMenu} />
          <Menu type={type} closeMenu={this.closeMenu} />
        </div>
        <div className="sidebar-bottom">
          {isDev && <Stats />}
          <Footer />
        </div>
      </aside>
    )
  }
}

export default Sidebar
