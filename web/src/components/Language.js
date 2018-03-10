import React from 'react'
import PropTypes from 'prop-types'

import './Language.scss'

// #feb692
// #ea5455

const Language = ({
  style: { width, opacity, height },
  data: { name, text, bg: backgroundColor }
}) => (
  <div
    data-lang={`${name} - ${text}`}
    className="animated-bar"
    style={{
      height,
      opacity
    }}
  >
    <div
      className="bar"
      style={{
        width: `${width}%`,
        backgroundColor
      }}
    />
  </div>
)

Language.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    opacity: PropTypes.number
  }),
  data: PropTypes.shape({
    bg: PropTypes.string,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
}

export default Language
