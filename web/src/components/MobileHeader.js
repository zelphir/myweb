import React from 'react'
import { sidebarService } from 'react-sidebarjs'
import classNames from 'classnames/dedupe'
import { ReactComponent as Menu } from '../assets/svgs/menu.svg'
import './MobileHeader.css'

class MobileHeader extends React.PureComponent {
  handleOnClick = e => {
    e.preventDefault()
    sidebarService.toggle('sidebar')
  }

  render() {
    const { type } = this.props

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

export default MobileHeader
