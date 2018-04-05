import React from 'react'
import Svg from 'react-inlinesvg'
import { sidebarService } from 'react-sidebarjs'

import menu from '../assets/svgs/menu.svg'
import './MobileHeader.scss'

class MobileHeader extends React.PureComponent {
  handleOnClick = e => {
    e.preventDefault()
    sidebarService.toggle('sidebar')
  }

  render() {
    return (
      <div className="mobile-header">
        <span className="toggle-menu" onClick={this.handleOnClick}>
          <Svg src={menu} />
        </span>
        <span className="mobile-title">{process.env.DOMAIN}</span>
      </div>
    )
  }
}

export default MobileHeader
