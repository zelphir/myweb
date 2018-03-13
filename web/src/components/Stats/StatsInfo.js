import React from 'react'
import ReactTooltip from 'react-tooltip'
import Svg from 'react-inlinesvg'

import info from '../../assets/icons/info.svg'

const StatsInfo = () => (
  <React.Fragment>
    <div className="stats-info" data-tip="This is a ... blah blah">
      <span className="stats-label">
        Live coding stats
        <Svg src={info} className="stats-icon" />
      </span>
    </div>
    <ReactTooltip place="left" type="light" effect="solid" />
  </React.Fragment>
)

export default StatsInfo
