import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const Language = ({
  style: { width, opacity, height },
  data: { name, text, bg: backgroundColor }
}) => (
  <div className="language" style={{ height }}>
    <span className="label" style={{ opacity }} data-tip={text}>
      {name}
    </span>
    <div
      className="bar"
      style={{
        width: `${width}%`,
        backgroundColor
      }}
    />
    <ReactTooltip place="left" effect="solid" />
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
