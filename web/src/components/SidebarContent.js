import React from 'react'
import { Link } from 'react-static'
import { sidebarService } from 'react-sidebarjs'
import PerfectScrollbar from 'perfect-scrollbar'

import Stats from './Stats'
import Info from './Info'
import Footer from './Footer'

class Sidebar extends React.PureComponent {
  closeMenu = () => {
    sidebarService.toggle('sidebar')
  }

  ps = null

  componentDidMount() {
    this.ps = new PerfectScrollbar('#sidebar', { suppressScrollX: true })
    this.ps.update()
  }

  componentWillUmnount() {
    this.ps.destroy()
  }

  render() {
    return (
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-top">
          <Info />
          <div className="menu">
            <Link to="/" onClick={this.closeMenu}>
              Home
            </Link>
            <Link to="/photos" onClick={this.closeMenu}>
              Photos
            </Link>
            <Link to="/resume" onClick={this.closeMenu}>
              Resume
            </Link>
            <Link to="/blog" onClick={this.closeMenu}>
              Blog
            </Link>
          </div>
        </div>
        <div className="sidebar-bottom">
          <Stats />
          <Footer />
        </div>
      </aside>
    )
  }
}

export default Sidebar
