import React from 'react'
import { StatefulToolTip } from 'react-portal-tooltip'
import Svg from 'react-inlinesvg'

import info from '../../assets/icons/info.svg'

const StatsInfo = () => (
  <StatefulToolTip
    position="left"
    tooltipTimeout={200}
    parent={
      <span className="stats-label">
        Live coding stats
        <Svg src={info} className="stats-icon" />
      </span>
    }
    className="stats-info"
  >
    This is a...
  </StatefulToolTip>
)

export default StatsInfo
