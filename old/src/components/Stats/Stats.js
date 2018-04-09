import React from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring, presets } from 'react-motion'
import randomColor from 'randomcolor'
import get from 'lodash/get'
import WhatDoing from './WhatDoing'
import Languages from './Languages'
import StatsInfo from './StatsInfo'
import Spinner from '../Spinner'
import './Stats.scss'

class Stats extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object,
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
    const { error, loading, data } = this.props
    const languages = get(data, 'allDailyStats[0].entries', [])

    return (
      <div id="stats">
        {error ? (
          <div className="stats-error">{error.message}</div>
        ) : loading ? (
          <Spinner fluid />
        ) : (
          <React.Fragment>
            {!languages.length && <WhatDoing />}
            {!!languages.length && (
              <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                styles={this.getStyles(languages)}
              >
                {styles => <Languages languages={styles} />}
              </TransitionMotion>
            )}
          </React.Fragment>
        )}
        <StatsInfo />
      </div>
    )
  }
}

export default Stats
