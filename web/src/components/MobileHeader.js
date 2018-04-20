import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { ReactComponent as Menu } from '../assets/svgs/menu.svg'
import './MobileHeader.css'

class MobileHeader extends React.PureComponent {
  handleOnClick = e => {
    e.preventDefault()
    sidebarService.toggle('sidebar')
  }

  render() {
    const { location: { pathname } } = this.props
    const type = pathname.includes('/photo') ? 'photos' : 'dev'

    return (
      <div className={classNames('mobile-header', type)}>
        <span className="toggle-menu" onClick={this.handleOnClick}>
          <Menu />
        </span>
        <span className="mobile-title">{process.env.REACT_APP_DOMAIN}</span>
      </div>
    )
  }
}

export default withRouter(MobileHeader)
