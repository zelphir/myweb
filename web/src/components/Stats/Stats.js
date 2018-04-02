import React from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import randomColor from 'randomcolor'

import WhatDoing from './WhatDoing'
import Languages from './Languages'
import StatsInfo from './StatsInfo'

import './Stats.scss'

class Stats extends React.PureComponent {
  static propTypes = {
    languages: PropTypes.array.isRequired,
    subscribeToDailyStats: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.subscribeToDailyStats()
  }

  willLeave() {
    return { opacity: spring(0), width: spring(0), height: 0 }
  }

  willEnter() {
    return { width: 0 }
  }

  getStyles = languages =>
    languages.map(({ name, percent, text }) => {
      const bg = randomColor({
        luminosity: 'dark',
        format: 'rgba',
        hue: 'monochrome',
        alpha: 0.15,
        seed: name
      })

      return {
        style: {
          width: spring(percent, presets.wobbly),
          opacity: 1,
          height: 30
        },
        key: name.replace(/\s/g, '').toLowerCase(),
        data: {
          name,
          text,
          bg
        }
      }
    })

  render() {
    const { languages } = this.props

    return (
      <div id="stats">
        {!languages.length && <WhatDoing />}
        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={this.getStyles(languages)}
        >
          {styles => <Languages languages={styles} />}
        </TransitionMotion>
        <StatsInfo />
      </div>
    )
  }
}

export default Stats
