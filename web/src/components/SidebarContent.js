import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'
import classNames from 'classnames/dedupe'
import Stats from './Stats'
import Footer from './Footer'
import Menu from './Menu'
import Info from './Info'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

class Sidebar extends React.PureComponent {
  closeMenu = () => {
    sidebarService.close('sidebar')
  }

  applyScrollbar() {
    this.ps = new PerfectScrollbar('#sidebar', {
      suppressScrollX: true
    })
  }

  componentDidUpdate() {
    this.applyScrollbar()
  }

  componentDidMount() {
    this.applyScrollbar()
  }

  componentWillUnmount() {
    this.ps.destroy()
    this.ps = null
  }

  render() {
    const { type } = this.props
    const isDev = type === 'dev'

    return (
      <aside className={classNames('sidebar', type)} id="sidebar">
        <div className="sidebar-top">
          <Info isDev={isDev} />
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
