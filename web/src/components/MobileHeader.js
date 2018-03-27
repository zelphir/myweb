import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'react-inlinesvg'

import menu from '../assets/icons/menu.svg'
import './MobileHeader.scss'

const MobileHeader = ({ openMenu }) => (
  <div className="mobile-header">
    <span onClick={openMenu}>
      <Svg src={menu} />
    </span>
  </div>
)

MobileHeader.propTypes = {
  openMenu: PropTypes.func.isRequired
}

export default MobileHeader
