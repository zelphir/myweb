import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'react-inlinesvg'
import classNames from 'classnames/dedupe'
import pacmanSvg from '../assets/svgs/pacman.svg'
import loadingSvg from '../assets/svgs/loading.svg'
import './Spinner.css'

const Spinner = ({ light, pacman, fluid }) => (
  <div className={classNames('spinner', { light, fluid })}>
    <Svg src={pacman ? pacmanSvg : loadingSvg} />
  </div>
)

Spinner.propTypes = {
  light: PropTypes.bool,
  fluid: PropTypes.bool,
  pacman: PropTypes.bool
}

export default Spinner
