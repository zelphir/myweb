import React from 'react'
import PropTypes from 'prop-types'
import { StatefulToolTip } from 'react-portal-tooltip'

const style = {
  style: {
    background: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    padding: 5
  },
  arrowStyle: {
    color: 'rgba(255, 255, 255, 0.8)'
  }
}

const Language = ({
  style: { width, opacity, height },
  data: { name, text, bg: backgroundColor }
}) => (
  <div className="language" style={{ height }}>
    <StatefulToolTip
      style={style}
      position="left"
      arrow="center"
      tooltipTimeout={200}
      parent={<span style={{ opacity }}>{name}</span>}
      className="label"
    >
      {text}
    </StatefulToolTip>
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
