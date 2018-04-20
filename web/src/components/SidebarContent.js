import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Stats from './Stats'
import Footer from './Footer'
import Menu from './Menu'
import Info from './Info'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

class SidebarContent extends React.PureComponent {
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
    const { location: { pathname } } = this.props
    const type = pathname.includes('/photo') ? 'photos' : 'dev'
    const isPhoto = type === 'photos'

    return (
      <aside className={classNames('sidebar', type)} id="sidebar">
        <div className="sidebar-top">
          <Info isPhoto={isPhoto} />
          <Menu type={type} closeMenu={this.closeMenu} />
        </div>
        <div className="sidebar-bottom">
          {!isPhoto && <Stats />}
          <Footer />
        </div>
      </aside>
    )
  }
}

export default withRouter(SidebarContent)
