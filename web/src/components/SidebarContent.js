import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-static'
import { sidebarService } from 'react-sidebarjs'
import classNames from 'classnames/dedupe'

import avatarDev from '../assets/images/avatar_dev.jpg'
import avatarPhotos from '../assets/images/avatar_photos.jpg'
import Stats from './Stats'
import Footer from './Footer'

const menus = {
  dev: [
    { to: '/', label: 'Home' },
    { to: '/resume', label: 'Resume' },
    { to: '/blog', label: 'Blog' },
    { to: '/photos', label: 'Photos' }
  ],
  photos: [{ to: '/', label: 'Home' }]
}

class Sidebar extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  closeMenu = () => {
    sidebarService.toggle('sidebar')
  }

  render() {
    const { type } = this.props
    const isDev = this.props.type === 'dev'

    return (
      <aside className={classNames('sidebar', type)} id="sidebar">
        <div className="sidebar-top">
          <div className="info">
            <img
              src={isDev ? avatarDev : avatarPhotos}
              className="avatar"
              alt="Roberto Manzella"
            />
            <h3 className="name">
              <span>Roberto</span>
              <span>Manzella</span>
            </h3>
            <div className="about">
              <span>Full stack developer</span>
            </div>
          </div>
          <div className="menu">
            {menus[type].map(({ to, label }) => (
              <Link to={to} key={to} onClick={this.closeMenu}>
                {label}
              </Link>
            ))}
          </div>
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
