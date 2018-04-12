import React from 'react'
import PropTypes from 'prop-types'
import { sidebarService } from 'react-sidebarjs'
import classNames from 'classnames/dedupe'
import { ReactComponent as Menu } from '../assets/svgs/menu.svg'
import './MobileHeader.css'

class MobileHeader extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string
  }

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
        <span className="mobile-title">{process.env.DOMAIN}</span>
      </div>
    )
  }
}

export default MobileHeader
