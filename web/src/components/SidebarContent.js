import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'
import Stats from './Stats'
import { withRouter } from 'react-router-dom'
import Footer from './Footer'
import Menu from './Menu'
import Info from './Info'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

class SidebarContent extends React.PureComponent {
  state = {
    type: 'dev'
  }

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
    this.getType()
  }

  componentDidMount() {
    this.applyScrollbar()
    this.getType()
  }

  componentWillUnmount() {
    this.ps.destroy()
    this.ps = null
  }

  getType = () => {
    const { location } = this.props
    const type = location.pathname.match(/\/photos?/) ? 'photos' : 'dev'
    this.setState({ type })
  }

  render() {
    const { type } = this.state
    const isPhoto = type === 'photos'

    return (
      <aside className={`sidebar ${type}`} id="sidebar">
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
