import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'
import Stats from './Stats'
import { withTheme } from '../lib/withTheme'
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
    this.ps.destroy()
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
    const { theme } = this.props
    const isPhoto = theme === 'photos'

    return (
      <aside className={`sidebar ${theme}`} id="sidebar">
        <div className="sidebar-top">
          <Info isPhoto={isPhoto} />
          <Menu type={theme} closeMenu={this.closeMenu} />
        </div>
        <div className="sidebar-bottom">
          {!isPhoto && <Stats />}
          <Footer />
        </div>
      </aside>
    )
  }
}

export default withTheme(SidebarContent)
