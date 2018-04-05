import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'react-inlinesvg'
import classNames from 'classnames/dedupe'
import pacmanSvg from '../assets/svgs/pacman.svg'
import loadingSvg from '../assets/svgs/loading.svg'
import './Spinner.scss'

const Spinner = ({ light, pacman }) => (
  <div className={classNames('spinner', { light })}>
    <Svg src={pacman ? pacmanSvg : loadingSvg} />
  </div>
)

Spinner.propTypes = {
  light: PropTypes.bool,
  pacman: PropTypes.bool
}

export default Spinner
