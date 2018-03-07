import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import randomColor from 'randomcolor'

// #feb692
// #ea5455

const Language = ({ width, name, text }) => (
  <CSSTransition timeout={1000} classNames="fade">
    <div
      data-lang={`${name} - ${text}`}
      className="animated-bar"
      style={{
        width,
        backgroundColor: randomColor({
          luminosity: 'light',
          hue: '#feb692',
          alpha: 0.5
        })
      }}
    />
  </CSSTransition>
)

Language.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Language
